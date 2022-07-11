import { useState,useEffect } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import useInfiniteScroll from './useInfiniteScroll';
import './App.css';

function App() {
  const [text, setText] = useState("");
  const [trending,setTrending] = useState([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [featured,setFeatured] = useState([]);
  const [page,setPage] = useState(20);
  const[isFetching,setIsFetching] = useInfiniteScroll(moreData);
  const [isSearchActive,setSearchActive]=useState(false);
  const [searchData,setSearchDate] = useState([]);

  
  // Load Featured Gifs
  const loadData = () => {
    var featured_base_url="https://tenor.googleapis.com/v2/featured?key=";
    var apiKey = "AIzaSyBO5TLC-rAm3DHDkMvx2YmGq46qkHJaF0k";
    var trending_limit= page;
    var client_key="zohoassignment"
    var featured_url=featured_base_url + apiKey + "&client_key=" + client_key+ "&limit=" + trending_limit;
    const fetchData = async() => {
      try {
        const response = await fetch(featured_url);
        const json = await response.json();
        console.log("Hello", json);
        setFeatured(json.results)
      }
      catch (error){
        console.log("error",error);
      } 
    }
    fetchData()
   }
   //Search Query Params
   const searchQuery=()=> {
    var search_term=text;
    var apiKey = "AIzaSyBO5TLC-rAm3DHDkMvx2YmGq46qkHJaF0k";
    var limit= 10;
    var client_key="zohoassignment";
    var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" + apiKey +"&client_key=" + client_key +  "&limit=" + limit;
    const fetchSearchData = async() => {
      try {
        const response = await fetch(search_url);
        const json = await response.json();
        console.log("Welcome", json);
        setSearchDate(json.results);
        setSearchActive(true)
      }
      catch (error){
        console.log("error",error);
      } 
    }
    fetchSearchData()
   }
  
  //Infinte scroll function for both search and featured Gifs...
   function moreData()  {
    var featured_base_url="https://tenor.googleapis.com/v2/featured?key=";
    var apiKey = "AIzaSyBO5TLC-rAm3DHDkMvx2YmGq46qkHJaF0k";
    var trending_limit= page;
    var client_key="zohoassignment";
    var search_term=text;
    var search_url = "https://tenor.googleapis.com/v2/search?q=" + search_term + "&key=" + apiKey +"&client_key=" + client_key +  "&limit=" + trending_limit;
    var featured_url=featured_base_url + apiKey + "&client_key=" + client_key+ "&limit=" + trending_limit;
   if(!isSearchActive){
    const fetchmoreData = async() => {
      try {
        const response = await fetch(featured_url);
        const json = await response.json();
        console.log("Welcome", json);
        setFeatured([...featured,...json.results]);
        setPage(page+10)
        setIsFetching(false)
      }
      catch (error){
        console.log("error",error);
      } 
    }
    fetchmoreData()
  }

  if(isSearchActive){
    const fetchmoreData = async() => {
      try {
        const response = await fetch(search_url);
        const json = await response.json();
        console.log("Welcome", json);
        setSearchDate([...searchData,...json.results]);
        setSearchActive(true)
        setPage(page+20)
        setIsFetching(false)
      }
      catch (error){
        console.log("error",error);
      } 
    }
    fetchmoreData()
  }
 }
  
 //Onsubmit functions here
   
  const onChange = evt => setText(evt.target.value);
  const onSubmit = evt => {
    evt.preventDefault();
   
    if (text === "") {
      setSearchActive(false)
    } else {
        setSearchActive(true);
        searchQuery()
    }
  };

  const OnSubmitfromTrending=(e,value)=>{
    setText(value);
    e.preventDefault();
    console.log(value);
    if(text !=""){
    setSearchActive(true);
    searchQuery()
    }
  }

  ///
  /// calling basic api while landing page 
  useEffect(() => {
    const trending_base_url= "https://tenor.googleapis.com/v2/categories?key=";
    var apiKey = "AIzaSyBO5TLC-rAm3DHDkMvx2YmGq46qkHJaF0k";
    var trending_limit= 10;
    var client_key="zohoassignment"
    var trending_data=[]
    var trending_url=trending_base_url + apiKey + "&client_key=" + client_key+ "&limit=" + trending_limit;
    
    const fetchTrendingData = async() => {
      try {
        const response = await fetch(trending_url);
        const json = await response.json();
        console.log("data", json);
        trending_data=[...trending_data,json.tags]
        setTrending(trending_data)
      }
      catch (error){
        console.log("error",error);
      } 
    }
  fetchTrendingData();
  loadData()
  },[]);
 

  
  
  return (
    <>
      <form onSubmit={onSubmit} className="form_value">
        <div className='search_div'>
        <input
          type="text"
          name="text"
          placeholder="search users..."
          value={text}
          onChange={onChange}
          className="search_bar"
        />
        <button type="submit" className="searh_button">
        <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        </div>
      </form>
      <div className='container'>
{!isSearchActive && trending.length!==0 && <div><h1>Trending Tenors Searches</h1>
<ReactSimplyCarousel
activeSlideIndex={activeSlideIndex}
onRequestChange={setActiveSlideIndex}
itemsToShow={1}
itemsToScroll={1}
forwardBtnProps={{
  style: {
    alignSelf: 'center',
    background: '#fff',
    border: '1px solid',
    borderRadius: '50%',
    color: '#000',
    cursor: 'pointer',
    fontSize: '20px',
    height: 30,
    lineHeight: 1,
    textAlign: 'center',
    width: 30,
    boxShadow:' 10px 5px 8px rgb(0 0 0 / 8%)'
  },
  children: <span>{`>`}</span>,
}}
backwardBtnProps={{
  style: {
    alignSelf: 'center',
    background: '#fff',
    border: '1px solid',
    borderRadius: '50%',
    color: '#000',
    cursor: 'pointer',
    fontSize: '20px',
    height: 30,
    lineHeight: 1,
    textAlign: 'center',
    width: 30,
    paddingRight:'10px',
    boxShadow:' 10px 5px 8px rgb(0 0 0 / 8%)'
  },
  children: <span>{`<`}</span>,
}}
responsiveProps={[
  {
    itemsToShow: 6,
    itemsToScroll: 6,
    minWidth: 768,
  },
]}
speed={100}
easing="linear"
>             
     {trending[0].map(i=>{
           return (
            <a onClick={(e)=> OnSubmitfromTrending(e,i.searchterm)}> 
            <div>
               <div className='trending_data' >
             <img src={i.image} className="trending_img" />
             </div>
             <p>{i.searchterm}</p>
             </div></a>
           )
       }) }
  </ReactSimplyCarousel>
 </div>}
        {!isSearchActive &&
        <div><h1>featured Gifs</h1>
        <div className='image_data'>
        { featured.length>0 &&
         featured.map(i=> {
           return(
            <div><img src={i.media_formats.gif.url} className="trending_img" /></div>
           )
         })
        }
      </div>
      </div>}
      {isSearchActive &&
        <div>
        <h1>Searched {text} Gifs</h1>
        <div className='image_data'>
        { searchData.length>0 &&
         searchData.map(i=> {
           return(
            <div><img src={i.media_formats.gif.url} className="trending_img" /></div>
           )
         })
        }
      </div>
      </div>}
      </div>
    </>
  );
}

export default App;

/// Notes about on the code.. 
/* I have been used the React simple carousel for carousel and also i write the funtion of infinite scroll for the scroll till the end of api api not providing pagination style i calling the withan limit of increases..
Please double click the trending gifs because you get the results..
thanks & Regrads,
Thirumalaisamy.p
*/
