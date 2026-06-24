
export const metadata = {
  title: "Hello YouthJS",
  description: "self-holder"
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}