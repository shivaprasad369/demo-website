import Head from 'next/head';
import Link from 'next/link';

export default function Terms() {
  return (
    <>
      <Head><title>Terms & Conditions — Viraj Global Machinery</title></Head>
      <div style={{background:'var(--navy)',padding:'44px 0 36px'}}>
        <div className="container">
          <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:10,display:'flex',gap:6}}>
            <Link href="/" style={{color:'rgba(255,255,255,0.5)',textDecoration:'none'}}>Home</Link> / Terms & Conditions
          </div>
          <h1 style={{fontFamily:"'Fraunces',serif",fontSize:34,fontWeight:900,color:'#fff'}}>Terms & Conditions</h1>
        </div>
      </div>
      <div className="container" style={{padding:'48px 24px',maxWidth:860}}>
        <div style={{fontSize:13,color:'var(--text3)',marginBottom:28}}>Last updated: January 2025</div>
        {[
          {title:'1. General',body:'By using the Viraj Global Machinery website, you agree to these Terms and Conditions. These terms apply to all website visitors and enquiry form submissions.'},
          {title:'2. Products & Pricing',body:'All prices displayed are ex-factory, Hubballi, excluding transportation and GST unless stated otherwise. Prices are subject to change without prior notice. Final price is confirmed through the quotation process.'},
          {title:'3. Enquiries & Orders',body:'Submitting an enquiry form does not constitute a purchase order. Orders are confirmed only through a formal purchase order and advance payment as per agreed terms.'},
          {title:'4. Warranty',body:'Viraj Global Machinery provides 1-year warranty on motors and 5-year warranty on gear boxes for all eligible products from the date of dispatch. Warranty does not cover misuse, negligence, or wear-and-tear damage.'},
          {title:'5. Delivery',body:'Delivery timelines are estimates and may vary based on production schedule and logistics. Transport charges are borne by the buyer unless otherwise agreed in writing.'},
          {title:'6. Payment',body:'Standard payment terms are agreed at the time of order confirmation. We accept bank transfer (NEFT/RTGS/IMPS). GST invoice is provided for all transactions.'},
          {title:'7. Returns & Cancellations',body:'Orders once confirmed and production started cannot be cancelled without written approval. Return requests are evaluated on a case-by-case basis. Custom machines are non-returnable.'},
          {title:'8. Limitation of Liability',body:'Viraj Global Machinery is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our products.'},
          {title:'9. Governing Law',body:'These terms are governed by the laws of Karnataka, India. Any disputes are subject to the jurisdiction of courts in Hubballi, Karnataka.'},
          {title:'10. Contact',body:'For any queries related to these terms, contact us at virajglobalmachinery@gmail.com or +91 90357 77333.'},
        ].map((s,i) => (
          <div key={i} style={{marginBottom:28}}>
            <h3 style={{fontFamily:"'Fraunces',serif",fontSize:18,fontWeight:700,color:'var(--navy)',marginBottom:8}}>{s.title}</h3>
            <p style={{fontSize:14.5,color:'var(--text2)',lineHeight:1.8}}>{s.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
