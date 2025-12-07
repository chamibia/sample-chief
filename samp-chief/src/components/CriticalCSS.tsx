import { Suspense } from 'react'

// Critical CSS for above-the-fold content - only essential styles
const criticalStyles = `
  /* Essential base styles */
  html,body{font-family:"AlteHaasGrotesk",system-ui,sans-serif;height:100%;overflow-x:hidden;letter-spacing:0.025em;-webkit-font-smoothing:antialiased;}
  /* Layout essentials */
  .container{max-width:1200px;margin:0 auto;padding:0 1rem;}
  .grid{display:grid;}
  .flex{display:flex;}
  .hidden{display:none;}
  /* Typography essentials */
  .text-black{color:#000;}
  .text-white{color:#fff;}
  .font-bold{font-weight:700;}
  .uppercase{text-transform:uppercase;}
  /* Spacing essentials */
  .p-4{padding:1rem;}
  .m-0{margin:0;}
  .mb-4{margin-bottom:1rem;}
  /* Responsive grid */
  .col-span-2{grid-column:span 2/span 2;}
  .col-span-3{grid-column:span 3/span 3;}
  .col-span-4{grid-column:span 4/span 4;}
  .grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr));}
  .grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr));}
  .grid-cols-12{grid-template-columns:repeat(12,minmax(0,1fr));}
  /* Custom utilities */
  .fixed-row-height{grid-auto-rows:22rem;}
  .font-alte{font-family:"AlteHaasGrotesk",sans-serif;}
  .font-ruder{font-family:"RuderPlakatLL",sans-serif;}
`

interface CriticalCSSProps {
  children: React.ReactNode
}

export default function CriticalCSS({ children }: CriticalCSSProps) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: criticalStyles,
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </>
  )
}