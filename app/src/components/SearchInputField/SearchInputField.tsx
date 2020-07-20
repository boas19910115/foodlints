import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Dropdown, InputGroup, FormControl, Button } from 'react-bootstrap';
import classes from './SearchInputField.module.scss';
import classNames from 'classnames';
import backendFunctions from 'services/firebase/functions';

function SearchInputField(props: React.Props<any>) {
  const [restaurantNames, setRestaurantNames] = useState([]);
  const [currentSearchTxt, setCurrentSearchTxt] = useState('');
  const [isInputting, setIsInputting] = useState(false);
  useEffect(() => {
    backendFunctions
      .getAllRestaurantNames()
      .then((res) => {
        const names = res.data.names
          .map((n: string) => n.replace(/"/g, ''))
          .sort();
        setRestaurantNames(names);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const onChange = useCallback((e) => {
    setIsInputting(true);
    setCurrentSearchTxt(e.target.value);
  }, []);

  const SearchList = useMemo(() => {
    const results = restaurantNames
      .filter((name: string) => {
        if (
          currentSearchTxt.length === 0 ||
          currentSearchTxt.trim().length === 0
        ) {
          return true;
        }
        if (name.toUpperCase().indexOf(currentSearchTxt.toUpperCase()) > -1) {
          return true;
        }
        return false;
      })
      .filter((_, index) => index < 30);

    return results.length ? (
      results.map((name: string, index) => (
        <Dropdown.Item
          className={classes.dropdownItem}
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSearchTxt(name);
          }}
          onMouseDown={() => {}}
          key={`${name}-${index}`}
          href={`#/${name}`}
          dangerouslySetInnerHTML={{
            __html: name.replace(
              new RegExp(`${currentSearchTxt}`, 'gi'),
              (substr) => `<span style="color:red;">${substr}</span>`
            ),
          }}
        ></Dropdown.Item>
      ))
    ) : (
      <Dropdown.Item disabled>Not Found</Dropdown.Item>
    );
  }, [currentSearchTxt, restaurantNames]);

  return (
    <Dropdown className={classes.container}>
      <Dropdown.Toggle
        className={classes.clickPart}
        variant="success"
        id="dropdown-basic"
      >
        <InputGroup className={classNames('mb-3', classes.inputPart)}>
          <FormControl
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={onChange}
            value={currentSearchTxt}
          />
          <InputGroup.Append>
            <Button
              onClick={(e) => {
                e.stopPropagation();
              }}
              variant="outline-primary"
            >
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Dropdown.Toggle>
      <Dropdown.Menu show={isInputting}>{SearchList}</Dropdown.Menu>
    </Dropdown>
  );
}

export default SearchInputField;
