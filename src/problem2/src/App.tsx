import "./App.css";
import { CurrencySwap } from "./pages/CurrencySwap";

function App() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h1 className="sm:text-xl md:text-4xl font-bold text-center m-8">Fancy Form</h1>
      <CurrencySwap />
    </>
  );
}

export default App;
