import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/button/Button"
import { Layout } from "../../components/layout/Layout"
import { routes } from "../../routes"
import OrderContext from "../../contexts/OrderContext"

import Mussarela from "../../assets/pizza-flavours/mucarela.png"
import ChickenWithCheese from "../../assets/pizza-flavours/frango-catupiry.png"
import Margherita from "../../assets/pizza-flavours/margherita.png"
import Lusa from "../../assets/pizza-flavours/portuguesa.png"

import { convertToCurrency } from "../../helpers/convertToCurrency"

import {
  FlavourActionWrapper,
  FlavourCard,
  FlavourCardDescription,
  FlavourCardImage,
  FlavourCardPrice,
  FlavourCardTitle,
  FlavourContentWrapper,
} from "./Flavours.styles"
import { Title } from "../../components/title/Title"

export default function Flavours() {
  const navigate = useNavigate()
  const { pizzaSize, pizzaFlavour, setPizzaFlavour } = useContext(OrderContext)
  const [flavourId, setflavourId] = useState("")
  const [selectedFlavours, setSelectedFlavours] = useState([]);

  const handleSelectFlavours = (event) => {
    const flavourId = event.target.id;
    if (selectedFlavours.includes(flavourId)) {
      setSelectedFlavours(selectedFlavours.filter((id) => id !== flavourId));
    } else {
      if (selectedFlavours.length < 2) {
        setSelectedFlavours([...selectedFlavours, flavourId]);
      }
    }
  };

  const flavoursOptions = [
    {
      id: "10",
      image: Mussarela,
      name: "Mussarela",
      description:
        "Muçarela especial fresca, finalizada com orégano e azeitonas portuguesas.",
      price: {
        "8": 71,
        "4": 35.5,
        "1": 18,
      },
    },
    {
      id: "11",
      image: ChickenWithCheese,
      name: "Frango com catupiry",
      description:
        "Peito de frango cozido, desfiado e refogado em azeite de oliva e temperos naturais, anéis de cebola sobre base de muçarela especial, bacon em cubos e Catupiry® gratinado. É finalizada com orégano.",
      price: {
        "8": 95,
        "4": 47.5,
        "1": 24,
      },
    },
    {
      id: "12",
      image: Margherita,
      name: "Margherita",
      description:
        "Muçarela especial, muçarela de búfala rasgada, fatias de tomate finalizada com folhas de manjericão orgânico e um fio de azeite aromatizado.",
      price: {
        "8": 90,
        "4": 45,
        "1": 22.5,
      },
    },
    {
      id: "13",
      image: Lusa,
      name: "Portuguesa",
      description:
        "Clássica pizza, leva presunto magro, cebola, palmito e ervilha sobre base de muçarela fresca. Finalizada com cobertura de ovos, orégano e azeitonas portuguesas. ",
      price: {
        "8": 93,
        "4": 46.5,
        "1": 23.5,
      },
    },
  ]

  const getPizzaFlavour = (id: string) => {
    return flavoursOptions.filter((flavour) => flavour.id === id)
  }

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setflavourId(event.target.id)
  }

  const handleBack = () => {
    navigate(routes.pizzaSize)
  }

  const handleNext = () => {
    const selectedFlavour = getPizzaFlavour(flavourId)
    setPizzaFlavour(selectedFlavour)
    navigate(routes.summary)
  }

  useEffect(() => {
    if (!pizzaFlavour) return

    setflavourId(pizzaFlavour[0].id)
  }, [])

  return (
    <Layout>
      <Title tabIndex={0}>Agora escolha o sabor da sua pizza</Title>
      <FlavourContentWrapper>
        {flavoursOptions.map(({ id, image, name, description, price }) => (
          <FlavourCard key={id} selected={id === flavourId ? true : false}>
            <FlavourCardImage src={image} alt={name} />
            <FlavourCardTitle>{name}</FlavourCardTitle>
            <FlavourCardDescription>{description}</FlavourCardDescription>
            <FlavourCardPrice>
              {convertToCurrency(price[pizzaSize[0].slices])}
            </FlavourCardPrice>
            <Button id={id} onClick={handleClick}>
              Selecionar
            </Button>
          </FlavourCard>
        ))}
      </FlavourContentWrapper>
      <FlavourActionWrapper>
        <Button inverse="inverse" onClick={handleBack}>
          Voltar
        </Button>
        <Button onClick={handleNext}>Escolha o sabor</Button>
      </FlavourActionWrapper>
    </Layout>
  )
  {
    id: "14", // Um ID exclusivo para o novo sabor
    image: Seu_Novo_Sabor_Imagem, // Substitua com o caminho da imagem do novo sabor
    name: "Bacon", // Nome do novo sabor
    description: "Bacon e Mussarela.", // Descrição do sabor
    price: {
      "8": 80, // Preço para pizza de 8 fatias
      "4": 40, // Preço para pizza de 4 fatias
      "1": 20, // Preço para pizza individual
    },
  },
  {
    id: "15", // Outro ID exclusivo para o segundo novo sabor
    image: Outro_Sabor_Imagem, // Substitua com o caminho da imagem do segundo novo sabor
    name: "Pepperoni", // Nome do segundo novo sabor
    description: "Pepperoni e Mussarela.", // Descrição do segundo sabor
    price: {
      "8": 85, // Preço para pizza de 8 fatias
      "4": 42.5, // Preço para pizza de 4 fatias
      "1": 21.5, // Preço para pizza individual
    },
  },  
}