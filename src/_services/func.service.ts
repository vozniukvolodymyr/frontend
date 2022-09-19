export const innerclassstatus = (status: number): string => {
  const res = "has-text-weight-bold";
  switch (status) {
    case 1:
      return res.concat(" has-text-white has-background-primary");
    case 2:
      return res.concat(" has-text-white has-background-danger");
    case 3:
      return res.concat(" has-text-black has-background-warning");
    default:
      return res.concat(" has-text-black has-background-warning");
  }
}

export const classrank = (rank: number, locale: any): string => {
  switch (rank) {
    case 1:
      return locale.rank_silver;
    case 2:
      return locale.rank_gold;
    case 3:
      return locale.rank_platinum;
    case 4:
      return locale.rank_director;
    default:
      return locale.rank_client;
  }
}

export const monthtostr = (month: number, locale: any): string => {
  switch (month) {
    case 1:
      return locale.month_January;
    case 2:
      return locale.month_February;
    case 3:
      return locale.month_March;
    case 4:
      return locale.month_April;
    case 5:
      return locale.month_May;
    case 6:
      return locale.month_June;
    case 7:
      return locale.month_July;
    case 8:
      return locale.month_August;
    case 9:
      return locale.month_September;
    case 10:
      return locale.month_October;
    case 11:
      return locale.month_November;
    case 12:
      return locale.month_December;
    default:
      return '';
  }
}

export const innerclassrank = (rank: number): string => {
  const res = "has-text-weight-bold";
  switch (rank) {
    case 1:
      return res.concat(" has-text-weight-bold has-text-black has-background-white-ter");
    case 2:
      return res.concat(" has-text-black has-background-warning");
    case 3:
      return res.concat(" has-text-white has-background-grey");
    case 4:
      return res.concat(" has-text-white color-back-menu");
    default:
      return res;
  }
}

export const objecthashmin = (data: any): number => {
  let res = 0;
  function calc(sum: number, str: string): number {
    return [...str].reduce((s: number, ...args) => s + str.charCodeAt(args[1]), sum);
  }
  for (const key of Object.keys(data)) {
    if (data[key]) {
      if (data[key] instanceof Array) {
        data[key].forEach((item: any) => res = calc(res, item.toString()));
      } else {
        res = calc(res, data[key].toString());
      }
    }
  }
  return res;
}

export const objecthash = (data: any): number => {
  let res = 0;
  function calc(sum: number, str: string): number {
    const length = str.length;
    for (let i = 0; i < length; i++) {
      const c = str.charCodeAt(i);
      sum = sum + c;
    }
    return sum;
  }
  for (const key of Object.keys(data)) {
    if (data[key]) {
      if (data[key] instanceof Array) {
        data[key].forEach((item: any) => {
          res = calc(res, item.toString());
        });
      } else {
        res = calc(res, data[key].toString());
      }
    }
  }
  return res;
}

export const looksLikeMail = (str: any): any => {
  return !!str && typeof str === 'string'
    //eslint-disable-next-line
    && (/^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/.test(str.trim()));
}

export const checkpassvalid = (value: string): boolean => {
  if (!value || value.length < 6 || value.length > 15) {
    return false
  } else {
    return true;
  }
}

export const commentvalid = (value: string): boolean => {
  if (!value || value.length > 128) {
    return false
  } else {
    return true;
  }
}

export const amountvalid = (value: string): boolean => {
  const val = parseFloat(value);
  if (!Number.isNaN(val) && val > 0 && val <= 1000000) {
    return true
  } else {
    return false;
  }
}

export const dateformat = (value: Date): string => {
  if (value instanceof  Date){
    return value.getFullYear() +
      "-" +
      ("0" + (value.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + value.getDate()).slice(-2);
  }else{
    return '';
  }
}

export const scrolltopshow = (style: any) => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    style.display = "block";
  } else {
    style.display = "none";
  }
}

export const scrolltop = () => {
  window.scroll({ top: 0, behavior: "smooth" });
  /*document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera*/
}
