import React from 'react';
import MemeTexts from './MemeTexts';
import ImageTiles from './ImageTiles';
import html2canvas from 'html2canvas';

class Memegenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: '',
      bottomText: '',
      random_img: 'https://i.imgflip.com/1bij.jpg',
      allMemeImgs: [],
      index: 0,
      texts: [],
      dragEventTarget: document.getElementsByTagName('body')[0],
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
    this.handleImagClick = this.handleImagClick.bind(this);
  }

  componentDidMount() {
    fetch('https://api.imgflip.com/get_memes')
      .then((response) => response.json())
      .then((data) => {
        let arrImg = data.data.memes;
        console.log(arrImg[0]['url']);

        this.setState({
          allMemeImgs: arrImg,
        });
      });
  }

  handleChange = function (event) {
    let { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleClick = function (event) {
    if (event.target.id === 'add') {
      console.log('Heelo');
      console.log(this.state.texts);
      this.setState((prevState) => {
        let arr = prevState.texts;
        arr.push(arr.length + 1);
        return {
          texts: arr,
        };
      });
      return;
    }

    if (event.target.id === 'download') {
      console.log('Donwloadss');

      let img_cont = document.getElementById('img_cont');
      html2canvas(img_cont).then(function (canvas) {
        console.log('abk');

        // let img = document.createElement('img');
        // img.src = this.state.random_img;
        // canvas.appendChild(img);
        var myImage = canvas.toDataURL('image/png');
        //create your own dialog with warning before saving file
        //beforeDownloadReadMessage();
        //Then download file
        var link = document.createElement('a');
        link.download = 'memeImage.png';
        link.href = 'data:' + myImage;
        document.body.appendChild(link);
        link.click();
        return;
      });
      return;
    }

    let index =
      event.target.id === 'prev' ? this.state.index - 1 : this.state.index + 1;

    if (index < 0 || index >= this.state.allMemeImgs.length) {
      return;
    }
    this.setState((prevState) => {
      let nextImg = prevState.allMemeImgs[index].url;

      return {
        random_img: nextImg,
        index: index,
      };
    });
  };

  handleDrag(event) {
    // event.dataTransfer.setData('text', event.target.id);
    // event.dataTransfer.setData('top', event.target.style.top);
    // event.dataTransfer.setData('left', event.target.style.left);
    this.setState(() => {
      return {
        dragEventTarget: event.target,
      };
    });
  }

  handleDrop(ev) {
    let dm = this.state.dragEventTarget;

    ev.target.appendChild(dm);
    dm.style.position = 'absolute';

    let top = document.getElementById('img_cont').offsetTop;
    let left = document.getElementById('img_cont').offsetLeft;
    console.log(ev.target);
    dm.style.left = ev.clientX - left + 250 + 'px';
    dm.style.top = ev.clientY - top + 40 + 'px';

    // dm.classList.add('light');
  }

  allowDrop(ev) {
    ev.preventDefault();
  }

  handleImagClick(event) {
    let url = event.target.getAttribute('url');
    let index = event.target.getAttribute('id');
    this.setState(() => {
      return {
        random_img: url,
        index: index,
      };
    });
  }

  render() {
    console.log('thisi is area');
    console.log(this.state.texts);
    let divs = this.state.texts.map((ele) => {
      return <MemeTexts id={ele} handleDrag={this.handleDrag} />;
    });

    let imgs = this.state.allMemeImgs.map((ele) => {
      return (
        <ImageTiles
          imageUrl={ele.url}
          id={this.state.allMemeImgs.indexOf(ele)}
          handleClick={this.handleImagClick}
        />
      );
    });
    return (
      <div class="container">
        <div class="image-gallery">{imgs}</div>
        <div class="work-area">
          <div>
            <button id="add" onClick={this.handleClick}>
              Add
            </button>
            {divs}
          </div>

          <br />
          <br />
          <br />
          <div>
            <button id="prev" onClick={this.handleClick}>
              Prev
            </button>
            <button id="next" onClick={this.handleClick}>
              Next
            </button>

            <button id="download" onClick={this.handleClick}>
              Download
            </button>
          </div>
          <br />
          <div
            id="img_cont"
            onDrop={this.handleDrop}
            onDragOver={this.allowDrop}
            style={{
              backgroundImage: `url(${this.state.random_img})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Memegenerator;
