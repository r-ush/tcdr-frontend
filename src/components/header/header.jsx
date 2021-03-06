import React from 'react'
import './header.css'
import SearchResult from '../search-result/search-result'
// import NewsCard from '../news-card/news-card'

class Header extends React.Component{
    constructor() {
        super();
        this.state = {
            value: ''
          };
    this.updateInput = this.updateInput.bind(this);
    this.handlePredict = this.handlePredict.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    }

    updateInput(event){
        this.setState({value : event.target.value})
    }

    handlePredict(event) {
        console.log(this.state)
            fetch("http://localhost:5000/predict", {
            method:"POST",
            cache: "no-cache",
            headers:{
                "content_type":"application/json",
            },
            body:JSON.stringify(this.state.value)
            }
        ).then(async response => {
                const data = await response.json();
    
                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                this.setState({ news: data })
                console.log(data)
                this.props.callbackFromParent(this.state.news);
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    handleSearch(event){
        console.log(this.state)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({body:this.state})
        };
        fetch('http://localhost:5000/sci', requestOptions)
            .then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                this.setState({ sci: data })
                this.props.callbackFromParent(this.sci);
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        return(
            <div className='header'>
                <div>
                <svg width="241" height="74" viewBox="0 0 241 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 16.5312V25.1875H31.0312V28.25H18.5V49.5312C18.5208 50.8438 18.7188 51.9375 19.0938 52.8125C19.4896 53.6667 20.0104 54.3646 20.6562 54.9062C21.3229 55.4271 22.0938 55.8021 22.9688 56.0312C23.8646 56.2604 24.8333 56.375 25.875 56.375C26.9167 56.375 27.9792 56.3021 29.0625 56.1562C30.1667 56.0104 31.1042 55.8646 31.875 55.7188L32.4375 58.5625C31.5417 58.9167 30.4479 59.1771 29.1562 59.3438C27.8646 59.5312 26.5521 59.625 25.2188 59.625C23.7188 59.625 22.3333 59.4375 21.0625 59.0625C19.7917 58.7083 18.6875 58.1354 17.75 57.3438C16.8125 56.5312 16.0729 55.4896 15.5312 54.2188C14.9896 52.9271 14.7083 51.3542 14.6875 49.5V28.25H5.28125V25.1875H14.6875V16.5312H18.5ZM58.1875 56.4688C59.4375 56.4688 60.625 56.2917 61.75 55.9375C62.8958 55.5625 63.9062 55.0312 64.7812 54.3438C65.6562 53.6562 66.3646 52.8333 66.9062 51.875C67.4688 50.8958 67.7917 49.7917 67.875 48.5625H71.4688C71.3854 50.1667 70.9688 51.6458 70.2188 53C69.4688 54.3542 68.4896 55.5208 67.2812 56.5C66.0729 57.4792 64.6875 58.25 63.125 58.8125C61.5625 59.3542 59.9167 59.625 58.1875 59.625C55.7083 59.625 53.5521 59.1562 51.7188 58.2188C49.8854 57.2812 48.3542 56.0312 47.125 54.4688C45.9167 52.9062 45 51.1146 44.375 49.0938C43.7708 47.0521 43.4688 44.9375 43.4688 42.75V41.4375C43.4688 39.25 43.7708 37.1458 44.375 35.125C45 33.0833 45.9167 31.2812 47.125 29.7188C48.3542 28.1562 49.8854 26.9062 51.7188 25.9688C53.5521 25.0312 55.6979 24.5625 58.1562 24.5625C60.0312 24.5625 61.7604 24.8646 63.3438 25.4688C64.9479 26.0521 66.3333 26.8854 67.5 27.9688C68.6875 29.0312 69.625 30.3021 70.3125 31.7812C71 33.2396 71.3854 34.8438 71.4688 36.5938H67.875C67.8125 35.3229 67.5208 34.1458 67 33.0625C66.4792 31.9792 65.7917 31.0417 64.9375 30.25C64.0833 29.4583 63.0729 28.8438 61.9062 28.4062C60.7604 27.9688 59.5104 27.75 58.1562 27.75C56.1979 27.75 54.5208 28.1458 53.125 28.9375C51.75 29.7292 50.625 30.7708 49.75 32.0625C48.875 33.3542 48.2292 34.8229 47.8125 36.4688C47.4167 38.0938 47.2188 39.75 47.2188 41.4375V42.75C47.2188 44.4583 47.4167 46.1354 47.8125 47.7812C48.2292 49.4271 48.875 50.8958 49.75 52.1875C50.625 53.4583 51.75 54.4896 53.125 55.2812C54.5208 56.0729 56.2083 56.4688 58.1875 56.4688ZM120.219 41.7812C120.219 39.5312 120.5 37.375 121.062 35.3125C121.625 33.2292 122.458 31.3958 123.562 29.8125C124.688 28.2083 126.083 26.9375 127.75 26C129.438 25.0417 131.417 24.5625 133.688 24.5625C135.833 24.5625 137.75 25.0208 139.438 25.9375C141.146 26.8542 142.573 28.1354 143.719 29.7812V11H147.438V59H143.938L143.781 54.5938C142.594 56.2188 141.135 57.4688 139.406 58.3438C137.677 59.1979 135.75 59.625 133.625 59.625C131.396 59.625 129.438 59.1458 127.75 58.1875C126.083 57.2083 124.688 55.9271 123.562 54.3438C122.458 52.7396 121.625 50.9062 121.062 48.8438C120.5 46.7604 120.219 44.625 120.219 42.4375V41.7812ZM124 42.4375C124 44.125 124.177 45.8021 124.531 47.4688C124.906 49.1354 125.5 50.6354 126.312 51.9688C127.125 53.2812 128.188 54.3438 129.5 55.1562C130.812 55.9688 132.417 56.375 134.312 56.375C135.375 56.375 136.375 56.2396 137.312 55.9688C138.271 55.6979 139.146 55.3125 139.938 54.8125C140.75 54.2917 141.469 53.6771 142.094 52.9688C142.74 52.2396 143.281 51.4271 143.719 50.5312V34.1562C143.302 33.2188 142.781 32.3646 142.156 31.5938C141.552 30.8229 140.854 30.1562 140.062 29.5938C139.271 29.0312 138.396 28.5938 137.438 28.2812C136.479 27.9688 135.458 27.8125 134.375 27.8125C132.458 27.8125 130.844 28.2292 129.531 29.0625C128.219 29.875 127.146 30.9479 126.312 32.2812C125.5 33.5938 124.906 35.0833 124.531 36.75C124.177 38.4167 124 40.0938 124 41.7812V42.4375ZM182.156 24.5625C183.094 24.5625 184.031 24.625 184.969 24.75C185.906 24.8542 186.688 25.0104 187.312 25.2188L186.844 28.8125C185.969 28.625 185.094 28.4792 184.219 28.375C183.344 28.2708 182.448 28.2188 181.531 28.2188C178.365 28.2188 175.677 28.9688 173.469 30.4688C171.26 31.9688 169.708 34.2708 168.812 37.375L168.844 59H164.969V25.1875H168.562L168.812 31.0625V31.75C170.188 29.5208 172.01 27.7708 174.281 26.5C176.552 25.2083 179.177 24.5625 182.156 24.5625Z" fill="white"/>
                <path d="M95.6562 57.9062C95.6562 58.8229 95.5521 59.7396 95.3438 60.6562C95.1562 61.5729 94.875 62.4792 94.5 63.375C94.1458 64.2708 93.6979 65.125 93.1562 65.9375C92.6146 66.7708 91.9896 67.5312 91.2812 68.2188L88.9062 66.7188C90.7396 64.1146 91.6562 61.2083 91.6562 58V53.125H95.6562V57.9062ZM212.625 45.4062H208.875V13.5H212.625V45.4062ZM208.25 56.75C208.25 56.0208 208.49 55.4062 208.969 54.9062C209.448 54.3854 210.094 54.125 210.906 54.125C211.74 54.125 212.396 54.3854 212.875 54.9062C213.375 55.4062 213.625 56.0208 213.625 56.75C213.625 57.4583 213.375 58.0521 212.875 58.5312C212.375 59.0104 211.719 59.25 210.906 59.25C210.094 59.25 209.448 59.0104 208.969 58.5312C208.49 58.0521 208.25 57.4583 208.25 56.75Z" fill="#E34625"/>
                </svg>
                </div>
                <form className='search-form'>
                    <div class="page">
                        <label class="field a-field a-field_a1">
                        <input onChange={this.updateInput.bind(this)} style={{color:'#fff'}} class="field__input a-field__input" placeholder="e.g. does sanitizer work?" />
                        <span class="a-field__label-wrap">
                            <span class="a-field__label">Search</span>
                        </span>
                        </label>
                    </div>
                    <div onClick={this.handlePredict.bind(this)} id="btn"><span class="noselect">Is this fake?</span><div id="circle"></div></div>
                    <div onClick={this.handleSearch.bind(this)} id="btn"><span class="noselect">Find some research</span><div id="circle"></div></div>
                    
                    {this.state.news?<SearchResult  title={this.state.news.title} sourceUrl={this.state.news.url} time={this.state.news.publishedAt} sourceName={this.state.news.sourceName} credibility={this.state.news.credibility} />:false}
                </form>            
            </div> 
        )
    
    }
}

export default Header;