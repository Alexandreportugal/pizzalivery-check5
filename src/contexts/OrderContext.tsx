import { createContext, useState } from "react"

type PizzaSizeType = {
  id: string
  flavours: number
  size: number
  slices: number
  text: string
}

type flavoursType = {
  flavors : Array<object>
}

type PizzaFlavourType = {
  id: string
  image: string
  name: string
  description: string
  price: {
    "8": number
    "4": number
    "1": number
  }
}

type pedidosType = {
  pedidos : Array<PizzaOrderType>
}

type PizzaOrderType = {
  //nada
}

type OrderContextProps = {
  pizzaSize: PizzaSizeType
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType>>
  pizzaFlavour: PizzaFlavourType
  setPizzaFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType>>
  pizzaOrder: PizzaOrderType
  setPizzaOrder: React.Dispatch<React.SetStateAction<PizzaOrderType>>
  flavours: flavoursType
  setflavours: React.Dispatch<React.SetStateAction<flavoursType>>
  pedidos: pedidosType
  setpedidos: React.Dispatch<React.SetStateAction<object>>
}

const OrderContext = createContext<OrderContextProps>({})

const OrderContextProvider = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState()
  const [pizzaFlavour, setPizzaFlavour] = useState()
  const [pizzaOrder, setPizzaOrder] = useState()
  const [flavours
  , setflavours
] = useState()
  const [pedidos, setpedidos] = useState()

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        pizzaOrder,
        setPizzaOrder,
        flavours
      ,
        setflavours
      ,
        pedidos,
        setpedidos
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export { OrderContextProvider }
export default OrderContext
