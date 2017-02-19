import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';


import SearchBar from './components/searchbar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

import _ from 'lodash';


const API_KEY='AIzaSyA6t6YvfpEJ6hPMNrlIPtXG-L2rtMj3Qlw';





class App extends Component{

  constructor(props){
    super(props);
    this.state={
      videos:[],
      selected_video:null
    };

    this.videoSearch('surfboards');

  }
  videoSearch(term){
    YTSearch({key:API_KEY,term:term},(data)=>{
      this.setState(
        {
          videos:data,
          selected_video:data[0]
        }
      );
    });
  }

  render(){

    const videoSearch=_.debounce((term)=>{this.videoSearch(term)},300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selected_video}/>
        <VideoList
          videos={this.state.videos}
          onVideoSelect={selectedVideo=>this.setState({selected_video:selectedVideo})}
        />
      </div>
    );
  }

}

ReactDOM.render(<App />, document.querySelector('.container'));
