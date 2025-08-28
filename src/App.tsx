import './App.css'
import ConverterView from '@/views/ConverterView'
import { ConverterProvider } from '@/store/ConverterContext'

export default function App() {
  return (
    <ConverterProvider>
      <ConverterView />
    </ConverterProvider>
  )
}
