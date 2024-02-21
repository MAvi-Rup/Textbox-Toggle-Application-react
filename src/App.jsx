import "./App.css";
import InputForm from "./components/InputForm";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h1 className="text-2xl font-semibold mb-4">
          Dynamic Textbox Generator
        </h1>
        <InputForm />
      </div>
    </div>
  );
}
export default App;
