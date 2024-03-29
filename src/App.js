import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./API/agent";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    if (country === "global") {
      const fetchedData = await fetchData();
      this.setState({ data: fetchedData, country: 'World' });
    } else {
      const fetchedData = await fetchData(country);
      this.setState({ data: fetchedData, country: country });
    }
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <h1>COVID-19 GEOGRAPHICAL TRACKER</h1>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
