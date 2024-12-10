import Header from "../../components/Header"
import { Materials } from "../../components/Materials"

const MaterialPage = () => {
  return (
    <>
        <div className="flex flex-col w-full mr-8">
            <header className="flex justify-between items-center mt-5 ">
                <Header title="Material Page" />
            </header>
            <section>
                <Materials />
            </section>
        </div>
    </>
  )
}

export default MaterialPage