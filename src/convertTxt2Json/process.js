const toArrayOfArrays = (rows, delim) => {
  rows = (rows) ? rows.split("\n") : [];
  const newRows = rows
    .filter(row => row !== "")
    .map(row => row.split(delim));
  return newRows;
};

const toObjArray = (heads, rows) => {
  return rows.map(function(row) {
    const obj = {};
    heads.forEach(function(field, i) {
      obj[field] = row[i] || null;
    });
    return obj;
  });
};

const toTableObject = (heads, rows) => {
  const obj = {};
  heads.forEach(h => {
    obj[h] = []; //a column array
  });
  rows.forEach(row => {
    heads.forEach((h, i) => {
      const val = row[i] || "null";
      obj[h].push(val);
    });
  });
  return obj;
};

const toRegex = del => {
  switch(del) {
      case "\\t": return /\t/;
      case "\\w": return /\w/;
      case "\\s": return /\s/;
      default: return del;
  }
};

export const process = fm => {
  const heads = fm.elHeads.current.value;
  const input = fm.elInput.current.value;
  const delim = fm.elDelim.current.value;
  const formt = fm.elFormat.current.value;

  const del = toRegex(delim);
  const headRow = (heads) ? heads.split(del) : [];
   if(formt==="A") {
    return toObjArray(headRow, toArrayOfArrays(input, del));
  } else {
    return toTableObject(headRow, toArrayOfArrays(input, del));
  }
};

//setup example
export const example = [
  "Name\tAge\tRelationship",
  `
Homer\t37\tFather
Marge\t35\tMother
Bart\t10\tSon
Lisa\t8\tDaughter
Maggie\t1\tBaby
`
];
