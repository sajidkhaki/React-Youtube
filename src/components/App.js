import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

import { Image, Header } from 'semantic-ui-react'

const KEY = 'AIzaSyCV-s6F6v_D6coNGKlJK-X5wL4qgeIByHc';

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('javascript');
  }

  onTermSubmit = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        key: KEY,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });

  };

  onVideoSelect = (video) => {
    console.log("On video select")
    this.setState({ selectedVideo: video });
  };


  render() {
    return (
      <div className="ui container">
        <div className="ui grid">


          <div className="ui row">
            <div className="four wide column">
              <Image src='https://media-exp1.licdn.com/dms/image/C4E03AQHtr9wawuQ9-g/profile-displayphoto-shrink_200_200/0/1610114805777?e=1616025600&v=beta&t=Nfr3YA6WmaHTgML6ci_t4SNr69UeJRJSPA9JKv5LL5c' size='small' circular />
            </div>


            <div className="eight wide column">
              <p style={{ fontSize: "18px", color:"green" }}>COMPUTER SCIENCE POSTGRADUATE FROM THE UNIVERSITY OF KASHMIR.
              MICROSOFT STUDENT PARTNER AND WINDOWS U-CREW MEMBER.</p>
              <span style ={{fontSize:"20px"}} >Full stack Developer</span>

              <Header as='h4' color='white'>
                <a href="https://www.linkedin.com/in/sajidkhaki">Developed By Sajid Khaki</a>
                <p>Linked In: <a href="https://www.linkedin.com/in/sajidkhaki">Sajid Khaki</a> </p>
              </Header>
            </div>
          </div>
        </div>


        <SearchBar onFormSubmit={this.onTermSubmit} />

        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column videoComponent">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="one wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
