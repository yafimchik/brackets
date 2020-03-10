function cutSpaces(expr){
  expr = expr.replace(/[ ]/g, "");
  return expr;    
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
  let brackets = "()[]||{}1234567788";
  return brackets[brackets.indexOf(bracket) + typeBracket(bracket)];
   
}
function bracketsArray2(str,arr = []){
  
  str = cutSpaces(str);

  let result = arr;
  let i = 0;
  
  for (let i = 0; i < str.length; i++){
    
    let br = str[i];
    if (typeBracket(br) <=  0) continue;
    let _br = secBracket(br); 
    if (i == str.length - 1) return false;
    
    if (_br == str[i + 1]){
        let j = 0;
        for (j = 0; j < result.length; j++){
            if (result[j][0] == br) break;
        }
        if (j == result.length) {
            result.push([]);
            result[j][0] = br;
            result[j][1] = _br;
        }
        str = str.substring(0, i) + str.substring(i + 2);
        return bracketsArray2(str,result);
    }
 
  }
  for (let i = 0; i < str.length; i++){
    
    let br = str[i];
    if (typeBracket(br) <=  0) continue;
    let _br = secBracket(br); 
    if (i == str.length - 1) return false;
    let  j = 0;
    let brackets = 0;
    for(j = i; j < str.length - 1; j++){
      if (str[j] == br) brackets++;
      if (str[j] == _br) brackets--;
      if (brackets == 0) break;
    } 
    if (j == str.length) return [];
    let substr = str.substring(i,j);
    result = bracketsArray2(substr,result);
    str = str.substring(0, i + 1) + str.substring(j);
    return bracketsArray2(str,result);

 
  }


  for (let i = 0; i < str.length; i++){
    
    let br = str[i];
    
    let _br = secBracket(br); 
    if (i == str.length - 1) return false;
    
    if (_br == str[i + 1]){
        let j = 0;
        for (j = 0; j < result.length; j++){
            if (result[j][0] == br) break;
        }
        if (j == result.length) {
            result.push([]);
            result[j][0] = br;
            result[j][1] = _br;
        }
        str = str.substring(0, i) + str.substring(i + 2);
        return bracketsArray2(str,result);
    }
 
  }
  return result;
}



module.exports = function check(str, bracketsConfig) {
  let brackets = bracketsArray2(str);
 
  if (brackets.length != bracketsConfig.length) return false;
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
