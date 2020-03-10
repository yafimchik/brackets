"use strict";
function cutSymb(expr, symb = " "){
  if (expr == "") return "";
  let _texpr = "";
  while (_texpr != expr){
    _texpr = expr;
    expr = expr.replace(symb, "");
  }
  return expr;
}

function simplybrackets(str = "",result = []){
  if (result === false) return false;
  while(str != ""){
    let _str = str;

    let i = 0;
    if (str.length % 2 == 1) return false;
    if (str[i] == str[str.length - 1 - i]){
      result = addArrU(result, str[i],str[i]);
      str = str.substring( i + 1, str.length - 1);
      continue;
    } 
    if (str[i] == str[i + 1]){
      result = addArrU(result, str[i],str[i]);
      str = str.substring(i + 2);
      continue;
    }
    if (str[str.length - 1 - i] == str[str.length - 1 - i - 1]){
      result = addArrU(result, str[str.length - 1 - i],str[str.length - 1 - i]);
      str = str.substring(0,str.length - 1 - i - 1);
      continue;
    }
    for (let j = 0; j < str.length - 1; j++){
      if (str[j] == str[j + 1]){
        result = addArrU(result, str[j],str[j]);
        str = strSubDel(str, j, j + 2);
        break;
      } 
    }
    if (str == _str && str!= "") return false;
    
  }
  return result;
}
function typeBracket(bracket){
  let result = 0;
  let f_brackets = "([{|13578";
  let l_brackets = ")]}|24678";
  if (f_brackets.includes(bracket)) result++;
  if (l_brackets.includes(bracket)) result--;
  return result;

}
function secBracket(bracket){
  let brackets = "()[]|{}12345678";
  return brackets[brackets.indexOf(bracket) + typeBracket(bracket)];
   
}
function addArrU(arr,br = "",_br = ""){
  if (br == "") return arr;
  let j = 0;
  for (j = 0; j < arr.length; j++){
    if (arr[j][0] == br) break;
  }
  if (j == arr.length) {
    arr.push([]);
    arr[j][0] = br;
    arr[j][1] = _br;
  }
  return arr;

}
function strSubDel(str, start = 0, end = 0){ // end not includes
  let lstr = "";
  let rstr = "";
  if (start >= 0 && start <= str.length) lstr =  str.substring(0, start); 
  if (end >= start && end < str.length) rstr =  str.substring(end, str.length);   
  return (lstr + rstr);
}
function bracketsArray2(str,arr = []){
  if (arr === false) return false;
  
  str = cutSymb(str," ");
 
  let result = arr;
  let i = 0;

  if (str == "") return result;
  
  for (let i = 0; i < str.length; i++){
    
    let br = str[i];
    if (typeBracket(br) <=  0) continue;
    let _br = secBracket(br); 
    if (i == str.length - 1) return false;
    
    if (_br == str[i + 1]){
        result = addArrU(result,br,_br);
        str = strSubDel(str,i,i + 2);
        return bracketsArray2(str,result);
    }
 
  }
  
  for (let i = 0; i < str.length; i++){
    
    let br = str[i];
    if (typeBracket(br) <= 0) continue;
    let _br = secBracket(br); 
    if (i == str.length - 1) return false;
    let  j = 0;
    let brackets = 0;
    for(j = i; j < str.length - 1; j++){
      if (str[j] == br) brackets++;
      if (str[j] == _br) brackets--;
      if (brackets == 0) break;
    } 
   
    if (j == str.length) return false;
    let substr = str.substring(i + 1,j);
  
    result = bracketsArray2(substr,result);
    str = strSubDel(str,i,j + 1);
    return bracketsArray2(str,result);

 
  }
  
    return simplybrackets(str,result);
 
}

module.exports = function check(str, bracketsConfig) {
  let brackets = bracketsArray2(str);
  if (brackets == false) return false;

  for (let arr of bracketsConfig){
    let i = 0;
    for (i = 0;  i < brackets.length; i++){
      if (arr[0] == brackets[i][0]) {
        brackets.splice(i,1);
        break;
      }
    }
  }
  if (brackets.length > 0) return false;
  return true;
} 