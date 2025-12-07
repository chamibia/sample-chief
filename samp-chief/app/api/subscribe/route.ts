// app/api/subscribe/route.ts
import mailchimp from '@mailchimp/mailchimp_marketing'
import crypto from 'crypto'
import { NextResponse } from 'next/server'

interface MailchimpMemberResponse {
  id: string
  email_address: string
  status: string
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
})

export async function POST(request: Request) {
const { firstName, lastName, email, country } = await request.json()

  if (!email || !country) {
    return NextResponse.json(
      { error: 'Missing fields. Both email and country are required.' },
      { status: 400 }
    )
  }

  const mergeFields: Record<string, string> = {
    MMERGE7: country, 
  }
  if (typeof firstName === 'string' && firstName.trim() !== '') {
    mergeFields.FNAME = firstName.trim()
  }
  if (typeof lastName === 'string' && lastName.trim() !== '') {
    mergeFields.LNAME = lastName.trim()
  }

  try {
    const response = (await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_LIST_ID!,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: mergeFields,
      }
    )) as MailchimpMemberResponse

    return NextResponse.json(
      { success: true, id: response.id },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('Mailchimp error on addListMember:', err)

    if (err.response?.body?.title === 'Member Exists') {
      try {
        const subscriberHash = crypto
          .createHash('md5')
          .update(email.toLowerCase())
          .digest('hex')

        const updateResponse = (await mailchimp.lists.updateListMember(
          process.env.MAILCHIMP_LIST_ID!,
          subscriberHash,
          {
            merge_fields: mergeFields,
          }
        )) as MailchimpMemberResponse

        return NextResponse.json(
          {
            success: true,
            message: 'Your subscription information has been updated!',
            id: updateResponse.id,
          },
          { status: 200 }
        )
      } catch (updateErr) {
        console.error('Failed to update existing member:', updateErr)
        return NextResponse.json(
          {
            success: true,
            message:
              "You're already subscribed and we couldn't update your info right now.",
          },
          { status: 200 }
        )
      }
    }

    const status = err.status || 500
    const errorBody = err.response?.body ?? err.message
    return NextResponse.json({ error: errorBody }, { status })
  }
}
