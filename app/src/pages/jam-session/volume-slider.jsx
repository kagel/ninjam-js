import React from 'react';


const volumeLookupTable = [
  0, 0.0333, 0.0667, 0.1, 0.1333, 0.1667, 0.2, 0.2333, 0.2667, 0.3,
  0.3333, 0.3667, 0.4, 0.4333, 0.4667, 0.5, 0.5333, 0.5667, 0.6, 0.6333,
  0.6667, 0.7, 0.7333, 0.7667, 0.8, 0.8333, 0.8667, 0.9, 0.9333, 0.9667,
  1, 1.1333, 1.2667, 1.4, 1.5333, 1.6667, 1.8, 1.9333, 2.0667, 2.2,
  2.3333, 2.4667, 2.6, 2.7333, 2.8667, 3, 3.1333, 3.2667, 3.4, 3.5333,
  3.6667, 3.8, 3.9333, 4.0667, 4.2, 4.3333, 4.4667, 4.6, 4.7333, 4.8667,
  5, 5.125, 5.25, 5.375, 5.5, 5.625, 5.75, 5.875, 6, 6.125, 6.25, 6.375,
  6.5, 6.625, 6.75, 6.875, 7, 7.125, 7.25, 7.375, 7.5, 7.625, 7.75, 7.875,
  8, 8.125, 8.25, 8.375, 8.5, 8.625, 8.75, 8.875, 9, 9.125, 9.25, 9.375,
  9.5, 9.625, 9.75, 9.875, 10
]

class VolumeSlider extends React.Component {
  constructor(props) {
    super(props);
    // Find the closest index for the initial volume
    this.state = {
      volumeIndex: this.logarithmicToLinear(props.volume || 0)
    };
    this.handleChange = this.handleChange.bind(this);
  }


  // Convert slider value to the volume using the lookup table
  linearToLogarithmic(sliderValue) {
    return volumeLookupTable[sliderValue];
  }

  // Find the closest index in the lookup table given a volume
  logarithmicToLinear(volume) {
    let closestIndex = 0;
    let closestDifference = Math.abs(volumeLookupTable[0] - volume);
    for (let i = 1; i < volumeLookupTable.length; i++) {
      const difference = Math.abs(volumeLookupTable[i] - volume);
      if (difference < closestDifference) {
        closestIndex = i;
        closestDifference = difference;
      }
    }
    return closestIndex;
  }

  handleChange(event) {
    const newSliderValue = parseInt(event.target.value, 10);
    const newVolumeLog = this.linearToLogarithmic(newSliderValue);
    console.log("Slider Value: " + newSliderValue + " | Volume: " + newVolumeLog);
    this.setState({volumeIndex: newSliderValue});

    if (this.props.onVolumeChange) {
      this.props.onVolumeChange(newVolumeLog);
    }
  }

  render() {
    return (
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={this.state.volumeIndex}
        onChange={this.handleChange}
        className="slider"
      />
    );
  }
}

export default VolumeSlider;
