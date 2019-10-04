export const isMobile = () => {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
};

export const guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const arrayToObj = (arr) => {
    return arr.reduce( (result, item) => {
        result[item.id] = item;
        return result;
    }, Object.create(null)) //watch out the empty {}, which is passed as "result"
};

export const statisticsToObj = (arr) => {
    return arr.reduce( (result, item) => {
        result[item.touchPoint] = item;
        return result;
    }, Object.create(null)) //watch out the empty {}, which is passed as "result"
};

export const filterArray = (arr, filterCtriteria) => {
    return arr.filter((item) => {
        return item.type === filterCtriteria;
    })
};

export const toPascalCase = (string) => {
    return `${string}`
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w+)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
      )
      .replace(new RegExp(/\s/, 'g'), '')
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }