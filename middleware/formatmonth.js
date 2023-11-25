function formatMonth(date) {
    return new Date(date).toISOString().slice(0, 7);
  }
  
  module.exports =  formatMonth ;