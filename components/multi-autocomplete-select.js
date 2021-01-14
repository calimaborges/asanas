import React, { useState, useRef, useEffect } from "react";
import produce from "immer";
import ButtonBadge from "../components/button-badge";
import SearchIcon from "./icons/search-icon";
import normalizarString from "../libs/normalizar-string";

export default function MultiAutocompleteSelect({ label, options, selected, onSelect, onUnselect, disabled }) {
  const [opened, setOpened] = useState(false);
  const [filter, setFilter] = useState("");
  const mainButton = useRef();
  const searchInput = useRef();
  const optionsElements = useRef();

  const unselectedOptions = produce(options, (draft) => {
    for (let key of selected) {
      delete draft[key];
    }
  });
  const filteredOptions = produce(unselectedOptions, (draft) => {
    for (let [key, item] of Object.entries(draft)) {
      if (normalizarString(item.description).indexOf(normalizarString(filter)) === -1) {
        delete draft[key];
      }
    }
  });

  function handleSelect(event) {
    setOpened(false);
    setFilter("");
    mainButton.current.focus();
    if (onSelect) onSelect(event.currentTarget.id);
  }

  function handleUnselect(event) {
    if (onUnselect) onUnselect(event.currentTarget.id);
  }

  useEffect(() => {
    function handleKeyEvent(event) {
      if (event.key === "Esc" || event.key === "Escape") {
        setOpened(false);
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        const buttons = optionsElements.current.children;

        const getNext = () => {
          if (buttons.length === 0) return;

          event.preventDefault();
          if (document.activeElement === searchInput.current) {
            buttons[0].focus();
          } else {
            if (document.activeElement.nextSibling !== null) {
              document.activeElement.nextSibling.focus();
            }
          }
        };

        const getPrevious = () => {
          if (document.activeElement === searchInput.current) return;

          event.preventDefault();
          if (buttons[0] === document.activeElement) {
            searchInput.current.focus();
          } else {
            if (document.activeElement.previousSibling !== null) {
              document.activeElement.previousSibling.focus();
            }
          }
        };

        if (event.key === "ArrowDown") {
          if (opened) {
            getNext();
          }
        }

        if (event.key === "ArrowUp") {
          if (opened) {
            getPrevious();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  });

  useEffect(() => {
    if (opened) {
      searchInput.current.focus();
    }
  }, [searchInput, opened]);

  const display = opened ? "block" : "hidden";
  return (
    <>
      {opened && (
        <button
          className="fixed inset-0 w-full h-full cursor-default"
          onClick={() => setOpened((o) => !o)}
          tabIndex="-1"
        />
      )}

      <>
        {selected.map((key) => (
          <ButtonBadge
            key={key}
            id={key}
            className="text-xs"
            icon="minus"
            description={options[key].description}
            color="gray"
            onClick={handleUnselect}
          />
        ))}
      </>

      <div className="">
        <ButtonBadge
          ref={mainButton}
          className="text-xs"
          icon="plus"
          description={label}
          color="blue"
          onClick={() => setOpened((o) => !o)}
          disabled={Object.values(unselectedOptions).length === 0 || disabled}
        />
        <div className={`z-10 max-w-xs overflow-hidden bg-white absolute border shadow-md rounded-lg ${display}`}>
          <div className="flex p-2 items-center border-b w-full">
            <SearchIcon className="h-4 w-4" />
            <input
              className="ml-2 text-xs focus:outline-none w-full"
              type="text"
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              ref={searchInput}
            />
          </div>
          <div ref={optionsElements} className="max-h-36 overflow-y-auto">
            {Object.entries(filteredOptions).map(([key, option]) => (
              <button
                id={key}
                key={key}
                className="block text-xs pl-3 p-2 text-left hover:bg-gray-100 w-full focus:outline-none focus:bg-gray-100"
                onClick={handleSelect}
              >
                {option.description}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}