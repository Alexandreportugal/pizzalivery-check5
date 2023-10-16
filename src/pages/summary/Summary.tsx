import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { routes } from "../../routes"
import OrderContext from "../../contexts/OrderContext"
import { Title } from "../../components/title/Title"
import { convertToCurrency } from "../../helpers/convertToCurrency"
import {
  SummaryActionWrapper,
  SummaryAmount,
  SummaryContentWrapper,
  SummaryDescription,
  SummaryDetails,
  SummaryImage,
  SummaryPrice,
  SummaryTitle,
} from "./Summary.style"
import { Button } from "../../components/button/Button"
import { Display2 } from "../../components/display2/Display2"
import { Display1 } from "../../components/display1/Display1"

export default function Summary() {
  const navigate = useNavigate()

  const { pizzaSize, pizzaFlavour, pizzaOrder, flavours, pedidos, setpedidos ,setPizzaOrder, setPizzaFlavour} = useContext(OrderContext)
  const [summaryData, setSummaryData] = useState({})
  const [summaryAmount, setSummaryAmount] = useState(0)
  const [listaPedidos, setlistaPedidos] = useState([])

  const payloadCreator = () => {
    let payload = {}
    if(flavours.length == 1){
      payload = {
        item: {
          name: summaryData.name,
          image: summaryData.image,
          size: summaryData.slices,
          slices: summaryData.slices,
          value: summaryData.price,
        },
        total: summaryData.price,
      }
    }
    if(flavours.length == 2){
       let name = flavours[0].name
       let name2 = flavours[1].name
        let nomeConcated = name + " / " +name2
        console.log(nomeConcated)
        payload = {
          item: {
            name: nomeConcated,
            image: summaryData.image,
            size: summaryData.slices,
            slices: summaryData.slices,
            value: summaryData.price,
          },
          total: summaryData.price,
        }
      }
      return payload
  }

  const handleBack = () => {
    navigate(routes.pizzaFlavour)
  }

  const handleAdd = () => {
    setpedidos([...listaPedidos])
    navigate(routes.pizzaSize)
  }

  const handleNext = () => {
    setpedidos([...listaPedidos])
    navigate(routes.checkout)
  }

  useEffect(() => {
    if (!pizzaFlavour) {
      return navigate(routes.pizzaSize)
    }

    if (!pizzaSize) {
      return navigate(routes.home)
    }

    if(flavours.length == 1){
      console.log(pizzaFlavour)
      let ok = ""
      ok = (pizzaSize[0].slices)
      ok = ok.toString()
      setSummaryData({
        text: flavours[0].description,
        slices: pizzaSize[0].slices,
        name: flavours[0].name,
        price: pizzaFlavour.price[ok],
        image: flavours[0].image
      })
    }

    if(flavours.length == 2){
      let ok = ""
      ok = (pizzaSize[0].slices)
      ok = ok.toString()
      setSummaryData({
        text: flavours[0].description,
        text2:flavours[1].description,
        slices: pizzaSize[0].slices,
        name: flavours[0].name,
        name2: flavours[1].name,
        price: pizzaFlavour.price[ok],
        image: flavours[0].image,
        image2: flavours[1].image
      })
    console.log(flavours)
    }
    
  }, [])
  
  useEffect(() =>{

    if(Object.keys(summaryData).length != 0){
    let payloaded = payloadCreator()
    console.log("1 - payload é:")
    console.log(payloaded)
    if(payloaded) {
      setPizzaOrder(payloaded)
    }
  }
  },[summaryData])

  useEffect(() =>{
    if(pizzaOrder){
    console.log("2 -")
    setlistaPedidos([...listaPedidos, pizzaOrder])
    console.log("pizzaOrder é: ")
    console.log(pizzaOrder)
    }
  },[pizzaOrder])

  useEffect(() => {
    console.log("listaPedidos é:")
    console.log(listaPedidos)
    //console.log(pedidos[0].item['name'])
  }, [listaPedidos])

  return (
    <Layout>
    <Title tabIndex={0}>Resumo do pedido</Title>
    <SummaryContentWrapper>
      {flavours.length === 2 ? (
        <Display2 summaryData={summaryData} />
      ) : (
        <Display1 summaryData={summaryData}/>
      )}
    </SummaryContentWrapper>
    <SummaryActionWrapper>
      <Button inverse="inverse" onClick={handleBack}>
        Voltar
      </Button>
      <Button onClick={handleAdd}> Adicionar outra pizza </Button>
      <Button onClick={handleNext}>Ir para o pagamento</Button>
    </SummaryActionWrapper>
  </Layout>
  )
}
