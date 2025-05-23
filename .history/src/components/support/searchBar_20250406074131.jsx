import React from 'react'

const SearchBar = (searchTerm, set) => {
    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        // Normalize text for diacritics (multilingual)
        const normalized = term.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        search(normalized);
      };
      
  return (
    <div>
        <input
          type="text"
          placeholder={t("Search...")}
          value={searchTerm}
          onChange={handleChange}
        />
    </div>
  )
}

export default SearchBar
