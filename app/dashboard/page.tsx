import { Card } from "@/app/ui/dashboard/cards"
import RevenueChart from "@/app/ui/dashboard/revenue-chart"
import LatestInvoices from "@/app/ui/dashboard/latest-invoices"
import { lusitana } from "@/app/ui/fonts"
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from "@/app/lib/data"
import { CardItem } from "../lib/definitions"




export default async function Page() {
  const revenue = await fetchRevenue()
  const latestInvoices = await fetchLatestInvoices()
  const cardData = await fetchCardData()



  const cardItem = (card: CardItem) => {
    return (
      <Card title={card.title} value={card.value} type={card.type} />
    )
  }

  const cardList = (cardTotal: {
    numberOfCustomers: number,
    numberOfInvoices: number,
    totalPaidInvoices: number,
    totalPendingInvoices: number,
  }) => {

    // title: string;
    // value: number | string;
    // type: 'invoices' | 'customers' | 'pending' | 'collected';
    const collectedCard: CardItem = { title: 'Collected', value: cardTotal.totalPaidInvoices, type: 'collected' }
    const pendingCard: CardItem = { title: 'Pending', value: cardTotal.totalPendingInvoices, type: 'pending' }
    const customerCard: CardItem = { title: 'Customers', value: cardTotal.numberOfCustomers, type: 'customers' }
    const invoicesCard: CardItem = { title: 'Invoices', value: cardTotal.numberOfInvoices, type: 'invoices' }
    return (
      <>
        {cardItem(collectedCard)}
        {cardItem(pendingCard)}
        {cardItem(customerCard)}
        {cardItem(invoicesCard)}
      </>
    )

  }

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" >
        {cardList(cardData)}
      </div>
      <div className="grid mt-6 grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8" >
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main >
  )
}