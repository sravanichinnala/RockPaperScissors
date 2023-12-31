import {Component} from 'react'

import {
  GameContainer,
  NamesContainer,
  NameParagraph,
  ScoreContainer,
  Paragraph,
  HeaderContainer,
  Heading,
  Container1,
  Container2,
  CustomButton,
  Images,
  ImagesContainer,
  ButtonContainer,
  OutputContainer,
  OutputImgContainer,
  OutputImgContainer1,
  OutputImgContainer2,
  OutputImage,
  OutputButton,
  OutputHeading,
  OutputParagraph,
  GameHeading,
} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class GamePage extends Component {
  state = {
    score: 0,
    toggleButton: true,
    output: '',
    userSelectedImage: '',
    randomSelectedImage: '',
  }

  getImageUrl = id => {
    const item = choicesList.find(image => {
      return image.id === id
    })
    return item.imageUrl
  }

  getRandomInput = () => {
    const randomId = Math.floor(Math.random() * 10) % 3
    return choicesList[randomId].id
  }

  generateScore = (userInput, randomInput) => {
    const {score, toggleButton} = this.state
    if (userInput === randomInput) {
      this.setState({output: 'IT IS DRAW'})
    } else if (userInput === 'ROCK') {
      const temp =
        randomInput === 'PAPER'
          ? this.setState({score: score - 1, output: 'YOU LOSE'})
          : this.setState({score: score + 1, output: 'YOU WON'})
    } else if (userInput === 'PAPER') {
      const temp =
        randomInput === 'SCISSORS'
          ? this.setState({score: score - 1, output: 'YOU LOSE'})
          : this.setState({score: score + 1, output: 'YOU WON'})
    } else {
      const temp =
        randomInput === 'ROCK'
          ? this.setState({score: score - 1, output: 'YOU LOSE'})
          : this.setState({score: score + 1, output: 'YOU WON'})
    }
    this.setState(
      {
        userSelectedImage: this.getImageUrl(userInput),
        randomSelectedImage: this.getImageUrl(randomInput),
      },
      () => {
        this.setState({toggleButton: !toggleButton})
      },
    )
  }

  userInput = userInput => {
    const randomInput = this.getRandomInput()
    this.generateScore(userInput, randomInput)
  }

  render() {
    const {
      output,
      userSelectedImage,
      randomSelectedImage,
      score,
      toggleButton,
    } = this.state
    return (
      <GameContainer>
        <GameHeading>Rock Paper Scissors</GameHeading>
        <HeaderContainer>
          <NamesContainer>
            <NameParagraph>ROCK</NameParagraph>
            <NameParagraph>PAPER</NameParagraph>
            <NameParagraph>SCISSORS</NameParagraph>
          </NamesContainer>
          <ScoreContainer>
            <Heading>Score</Heading>
            <Paragraph>{score}</Paragraph>
          </ScoreContainer>
        </HeaderContainer>
        {toggleButton ? (
          <ImagesContainer>
            <Container1>
              <CustomButton
                data-testid='rockButton'
                type='button'
                onClick={() => this.userInput(choicesList[0].id)}
              >
                <Images src={choicesList[0].imageUrl} alt={choicesList[0].id} />
              </CustomButton>
              <CustomButton
                data-testid='scissorsButton'
                type='button'
                onClick={() => this.userInput(choicesList[1].id)}
              >
                <Images src={choicesList[1].imageUrl} alt={choicesList[1].id} />
              </CustomButton>
            </Container1>
            <Container2>
              <CustomButton
                data-testid='paperButton'
                type='button'
                onClick={() => this.userInput(choicesList[2].id)}
              >
                <Images src={choicesList[2].imageUrl} alt={choicesList[2].id} />
              </CustomButton>
            </Container2>
          </ImagesContainer>
        ) : (
          <OutputContainer>
            <OutputImgContainer>
              <OutputImgContainer1>
                <OutputHeading>YOU</OutputHeading>
                <OutputImage src={userSelectedImage} alt='your choice' />
              </OutputImgContainer1>
              <OutputImgContainer2>
                <OutputHeading>OPPONENT</OutputHeading>
                <OutputImage src={randomSelectedImage} alt='opponent choice' />
              </OutputImgContainer2>
            </OutputImgContainer>
            <OutputParagraph>{output}</OutputParagraph>
            <OutputButton
              type='button'
              onClick={() => {
                this.setState({toggleButton: !toggleButton})
              }}
            >
              PLAY AGAIN
            </OutputButton>
          </OutputContainer>
        )}

        <ButtonContainer type='button'>Rules</ButtonContainer>
      </GameContainer>
    )
  }
}

export default GamePage
