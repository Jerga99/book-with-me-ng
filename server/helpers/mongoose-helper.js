module.exports = {
  normalizeErrors: function(errors) {
    let normErrors = [];

    for (let property in errors) {
      // It's necessary because an object's prototype contains additional properties for the object which are technically part of the object.
      if (errors.hasOwnProperty(property)) {
        normErrors.push({title: property, detail: errors[property].message})
      }
    }

    return normErrors;
  }
}
