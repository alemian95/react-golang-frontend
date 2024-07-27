import { Button } from "./components/ui/button"

function App() {

  return (
    <>
      <div className="light">
        <Button variant="default">Default</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="positive">Positive</Button>
        <Button variant="caution">Caution</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="dark">
        <Button variant="default">Default</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="positive">Positive</Button>
        <Button variant="caution">Caution</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </>
  )
}

export default App
