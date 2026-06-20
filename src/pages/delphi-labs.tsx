import dynamic from 'next/dynamic'
import Head from 'next/head'

const DelphiLabsComp = dynamic(() => import('../../delphi-labs.jsx'), { ssr: false })

export default function DelphiLabsPage() {
  return (
    <>
      <Head>
        <title>Delphi Labs</title>
        <meta name="description" content="Delphi Labs — workshops and training" />
      </Head>
          <div style={{ color: '#fff' }}>
            <DelphiLabsComp />
          </div>
    </>
  )
}
