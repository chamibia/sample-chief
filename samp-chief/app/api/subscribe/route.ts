import { NextResponse } from 'next/server'
import mailchimp from '@mailchimp/mailchimp_marketing'
import crypto from 'crypto'  // Import the Node.js crypto module

// Define response types
interface MailchimpMemberResponse {
  id: string;
  email_address: string;
  status: string;
}

// Configure Mailchimp
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
})

export async function POST(request: Request) {
  const { firstName, lastName, email, country } = await request.json()

  if (!email || !firstName || !lastName || !country) {
    return NextResponse.json(
      { error: 'Missing fields' },
      { status: 400 }
    )
  }

  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_LIST_ID!,
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
          MMERGE7: country,
        },
      }
    ) as MailchimpMemberResponse;

    return NextResponse.json(
      { success: true, id: response.id },
      { status: 201 }
    )
  } catch (err: any) {
    console.error('Mailchimp error:', err)
    
    // Check for "Member Exists" error
    if (err.response?.body?.title === "Member Exists") {
      // Option 1: Return a friendly message
      return NextResponse.json(
        { 
          success: true, 
          message: "You're already subscribed to our newsletter!" 
        }, 
        { status: 200 }
      )
      
      // Option 2: If you want to implement UPDATE functionality
      try {
        // Calculate MD5 hash of lowercase email correctly in Node.js
        const subscriberHash = crypto
          .createHash('md5')
          .update(email.toLowerCase())
          .digest('hex');
          
        // Update the existing member
        const updateResponse = await mailchimp.lists.updateListMember(
          process.env.MAILCHIMP_LIST_ID!,
          subscriberHash,
          {
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
              ADDRESS: country,
            },
          }
        ) as MailchimpMemberResponse;
        
        return NextResponse.json(
          { 
            success: true, 
            message: "Your subscription information has been updated!",
            id: updateResponse.id 
          }, 
          { status: 200 }
        )
      } catch (updateErr) {
        console.error('Failed to update member:', updateErr)
        return NextResponse.json(
          { 
            success: true, 
            message: "You're already subscribed to our newsletter!" 
          }, 
          { status: 200 }
        )
      }
    }
    
    const status = err.status || 500
    const errorBody = err.response?.body || err.message
    return NextResponse.json({ error: errorBody }, { status })
  }
}