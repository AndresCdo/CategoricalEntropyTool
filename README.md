# Categorical Entropy Tool

An interactive web application to visualize and experiment with the concept of information entropy using vertical sliders.

## Description

Entropy Sliders is an educational tool that allows users to manipulate a probability distribution and see in real time how these changes affect the system's entropy. The application displays a set of vertical sliders representing probabilities, with all values always summing to 1.

## Features

- Interactive visualization of probability distributions
- Real-time calculation and update of entropy
- Automatic normalization of probabilities
- Configurable number of sliders via URL parameters
- Responsive and minimalist interface
- Precise display with up to 4 decimal places

## Usage

### Installation

1. Clone this repository or download the files.
2. Open the `index.html` file in a modern web browser.

### Configuration

You can specify the desired number of sliders using the URL parameter `n_sliders`:

```bash
index.html?n_sliders=7
```

If not specified, the default is to display 5 sliders.

### Interaction

- Move the vertical sliders to adjust the probabilities.
- The values will automatically normalize to sum to 1.
- The entropy is displayed at the top and updates in real time.
- Precise numerical values are shown below each slider.

## Formulas Used

- **Normalization**: For a moved slider `i`, the other values are adjusted using:

    ```js
    scalar = (1 - value[i]) / (total_sum - value[i])
    new_value[j] = value[j] * scalar  (for j ≠ i)
    ```

- **Entropy**: Calculated using Shannon's formula:

    ```js
    H = -Σ(p * log2(p))
    ```

    where p represents the probability corresponding to each slider.

## Technical Requirements

- A modern web browser supporting:
  - ES6+ JavaScript
  - CSS3 Transforms
  - Input type="range"
  - Flexbox

## Known Limitations

- The interface is optimized for WebKit-based browsers.
- The minimum value for each slider is 0.0001 to avoid issues with log(0).
- Display may be affected on very small screens.

## Development

### Project Structure

```plaintext
├── index.html    # Main file containing HTML, CSS, and JavaScript
├── main.js       # Main JavaScript file with the application logic
├── styles.css    # Main CSS file with the application styles
└── README.md     # This file
```

### Possible Improvements

1. Add support for different visual themes.
2. Implement configuration export functionality.
3. Add additional visualizations of the distribution.
4. Support different measures of entropy.

## License

[MIT License](https://opensource.org/licenses/MIT)
