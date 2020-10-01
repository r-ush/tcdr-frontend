import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';

import BigLogo from './images/bigLogo.svg'

import Header from './components/header/header'
import NewsCard from './components/news-card/news-card'
import SciLit from './components/scilit/scilit'

class App extends React.Component{
  constructor(params) {
    super();
    this.state={
        data:[],
        sci: [] // add initial state for sci news array
    }
  }

  componentDidMount() {
      fetch('https://gnews.io/api/v3/search?q=corona&token=2307ba2c2d3055d75b721a06004addc8')
      //fetch()
          .then(async response => {
            const rawData = await response.json();

            if (!response.ok) {
                const error = (rawData && rawData.message) || response.statusText;
                return Promise.reject(error);
            }
            //this.setState({ rawData: rawData.articles })
            let postData={ rawData: rawData.articles }
            console.log(this.state)
            console.log(postData)
              
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({url:postData})
            };
            const res = await fetch('http://localhost:5000/load', requestOptions);
            const data = await res.json();
            this.setState({ data: data });
            console.log(this.state)
          })
          .catch(error => {
              this.setState({ errorMessage: error.toString() });
              console.error('There was an error!', error);
          })
  }

  // react to callback from Header
  myCallback = (dataFromChild) => {
    console.log(dataFromChild)
    this.setState({predictedNews:dataFromChild.news})
    this.setState({sci: dataFromChild.sci}) // update sci key with value from search
}
  render(dataFromChild){
    const {data, sci}=this.state // add sci key from state
    return (
      <div className="App">
        <Header className="header" callbackFromParent={this.myCallback} />
        <div className="logo">
          <img src={BigLogo} alt="React Logo" />
        </div>

        <Route exact path="/scientificliterature">
          <SciLit
            title="COVID-19 vaccines: knowing the unknown."
            description="COVID-19 is caused by a new coronavirus, SARS-CoV-2. Previous research on other coronavirus vaccines, such as FIPV, SARS and MERS, has provided valuable information. We are therefore optimistic about the rapid development of COVID-19 vaccine."
            sourceUrl="http://dx.doi.org/10.1002/eji.202048663"
          />
          <SciLit
            title="Immunogenicity of a DNA vaccine candidate for COVID-19"
            description="The coronavirus family member, SARS-CoV-2 has been identified as the causal agent for the pandemic viral pneumonia disease, COVID-19. At this time, no vaccine is available to control further dissemination of the disease. We have previously engineered a synthetic DNA vaccine targeting the MERS coronavirus Spike (S) protein, the major surface antigen of coronaviruses.COVID-19 is caused by a new coronavirus, SARS-CoV-2. Previous research on other coronavirus vaccines, such as FIPV, SARS and MERS, has provided valuable information. We are therefore optimistic about the rapid development of COVID-19 vaccine."
          />
          <SciLit
            title="An effective CTL peptide vaccine for Ebola Zaire Based on Survivors CD8+ targeting of a particular nucleocapsid protein epitope with potential implications for COVID-19 vaccine design."
            description="COVID-19 is caused by a new coronavirus, SARS-CoV-2. Previous research on other coronavirus vaccines, such as FIPV, SARS and MERS, has provided valuable information. We are therefore optimistic about the rapid development of COVID-19 vaccine."
            sourceUrl="https://linkinghub.elsevier.com/retrieve/pii/S0264410X20305181"
          />
          <h1 style={{ margin: "0 12.5%" }}>
            FOR Really Real News on COVID-19
          </h1>
        </Route>

        {data.map((news) => (
          <NewsCard
            title={news.title}
            image={news.image}
            description={news.description}
            sourceUrl={news.url}
            time={news.publishedAt}
            sourceName={news.sourceName}
            credibility={news.credibility}
          />
        ))}

        {sci.map((news) => (
          <NewsCard
            title={news.title}
            image={news.image}
            description={news.description}
            sourceUrl={news.url}
            time={news.publishedAt}
            sourceName={news.sourceName}
            credibility={news.credibility}
          />
        ))}

        <NewsCard
          title="Gazundered by the corona sharks: How ruthless house buyers are slashing offers and blaming the virus"
          image="https://images.gnews.io/42bc6fec612bb1ec1dfec227d081157a"
          description="The impact of coronavirus is still being felt in the property market - from nervous sellers to buyers trying to scoop a possible bargain. Joe Nutkins (pictured) fears viewers coming to her bungalow."
          time="2020-05-23 14:47:00 UTC"
          sourceName="This Is Money on MSN.com"
          sourceUrl="https://www.msn.com/en-gb/finance/other/gazundered-by-the-corona-sharks-how-ruthless-house-buyers-are-slashing-offers-and-blaming-the-virus/ar-BB14vtP1"
          credibility="70"
        />
        <NewsCard
          title="Gazundered by the corona sharks: How ruthless house buyers are slashing offers and blaming the virus"
          image="https://images.gnews.io/42bc6fec612bb1ec1dfec227d081157a"
          description="The impact of coronavirus is still being felt in the property market - from nervous sellers to buyers trying to scoop a possible bargain. Joe Nutkins (pictured) fears viewers coming to her bungalow."
          time="2020-05-23 14:47:00 UTC"
          sourceName="This Is Money on MSN.com"
          sourceUrl="https://www.msn.com/en-gb/finance/other/gazundered-by-the-corona-sharks-how-ruthless-house-buyers-are-slashing-offers-and-blaming-the-virus/ar-BB14vtP1"
        />
      </div>
    );
  }
}

export default App;
