import React from 'react';

class MemeTexts extends React.Component {
  constructor() {
    super();
    this.state = {
      color: 'black',
      display: 'None',
      contentEditable: 'false',
      fontSize: '20px',
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick = function (event) {
    console.log(event.target.getAttribute('name'));
    this.setState(() => {
      let toreturn = {};
      switch (event.target.getAttribute('name')) {
        case 'cancel':
          toreturn['display'] = 'None';
          toreturn['contentEditable'] = 'false';
          break;

        case 'dragdrop':
          toreturn['display'] = 'Block';

          break;

        case 'edit':
          toreturn['contentEditable'] = 'true';
          break;

        case 'delete':
          event.target.parentNode.parentNode.parentNode.removeChild(
            event.target.parentNode.parentNode
          );
          break;
        default:
          toreturn['display'] = 'None';
      }
      return toreturn;
    });
  };

  handleChange = function (event) {
    this.setState(() => {
      let toreturn = {};
      switch (event.target.getAttribute('name')) {
        case 'color':
          toreturn['color'] = event.target.value;

          break;

        case 'fontsize':
          toreturn['fontSize'] = `${event.target.value}px`;
          break;

        default:
          toreturn['display'] = 'None';
      }
      return toreturn;
    });
  };

  render() {
    return (
      <div onDragStart={this.props.handleDrag} draggable="true">
        <div
          id={this.props.ele}
          style={{
            width: 'fit-content',
            marginTop: '20px',
            fontWeight: 'Bold',
            color: `${this.state.color}`,
            fontSize: `${this.state.fontSize}`,
          }}
          name="dragdrop"
          onClick={this.handleClick}
          contentEditable={this.state.contentEditable}
        >
          Add Text Here
        </div>
        <div style={{ display: this.state.display }} name="editbox">
          <button name="edit" onClick={this.handleClick}>
            Edit Text
          </button>
          Color:
          <input type="color" name="color" onInput={this.handleChange} />
          <select name="fontsize" onChange={this.handleChange}>
            <option>Font Size</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
          <button name="delete" onClick={this.handleClick}>
            Delete
          </button>
          <button name="cancel" onClick={this.handleClick}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default MemeTexts;
