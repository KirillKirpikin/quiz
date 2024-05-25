import AppRoutes from "./Routes/AppRoutes"
import Header from "./components/Header"

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Header/>
        <main className="flex-grow">
            <AppRoutes/>
        </main>
    </div>
  )
}

export default App
