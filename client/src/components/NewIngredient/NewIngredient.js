import React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import './NewIngredient.scss';
// import AddIcon from "../../assets/icons/plus.svg"
// import AddImg from "../../assets/icons/uploadImg.svg"

class NewIngredient extends React.Component {
    
    defaultCats = [
      { label: "Produce", value: "Produce" },
      { label: "Dairy", value: "Dairy" },
      { label: "Meats", value: "Meats" },
      { label: "Dry Goods", value: "Dry Goods" },
      { label: "Frozen", value: "Frozen" },
      { label: "Other", value: "Other" }
    ];

    defaultStores = [
      { label: "Metro", value: "Metro" },
      { label: "No Frills", value: "No Frills" },
      { label: "Walmart", value: "Walmart" },
      { label: "Freshco", value: "Freshco" },
      { label: "Nations", value: "Nations" },
      { label: "Farmer's Market", value: "Farmer's Market" }
    ];

    addCategory(categoryName) {
      this.defaultCats.push({ label: categoryName, value: categoryName })
    }

    filterCats = (inputValue) => {
      return this.defaultCats.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    };

    searchCats = inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(this.filterCats(inputValue));
        }, 1000);
      });

    addStore(storeName) {
      this.defaultStores.push({ label: storeName, value: storeName })
    }

    filterStores = (inputValue) => {
      return this.defaultStores.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    };

    searchStores = inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(this.filterStores(inputValue));
        }, 1000);
      });

    render () {
      return (
        <>
          <form className="new-ingredient" name="newIngr" onSubmit={this.props.addIngredient.bind(this)}>
              <h3 className="new-ingredient__title">
                Add New Ingredient
              </h3>
              <hr className="new-ingredient__divider" />
              <div className="new-ingredient__details">
                <input
                  className="new-ingredient__input"
                  type="text"
                  name="ingName"
                  placeholder="Enter new ingredient"
                />
                <button
                  className="new-ingredient__btn new-ingredient__add-ingr"
                  alt="Submit Text"
                  name="submitText"
                >
                </button>
                <button
                  className="new-ingredient__btn new-ingredient__add-receipt"
                  alt="Scan Receipt"
                  name="submitImg"
                >
                </button>
              </div>
              <div className="new-ingredient__details new-ingredient__additional-details">
              {/* Food Category */}
              <AsyncCreatableSelect
                className="new-ingredient__select"
                name="ingCategory"
                placeholder="Category of Food..."
                cacheOptions
                onCreateOption={this.addCategory.bind(this)}
                defaultOptions={this.defaultCats}
                loadOptions={this.searchCats}
              />
              {/* Store Name */}
              <AsyncCreatableSelect
                className="new-ingredient__select"
                name="ingStore"
                placeholder="Purchased at..."
                cacheOptions
                onCreateOption={this.addStore.bind(this)}
                defaultOptions={this.defaultStores}
                loadOptions={this.searchStores}
              />
                
                {/* measurement.quantity
                  measurement.unit
                  datePurchased
                  price
                  store */}
              </div>
          </form>
        </>
      )
    }
}

export default NewIngredient;
