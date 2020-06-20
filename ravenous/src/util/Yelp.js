const apiKey = 'ZzS7CGLpJ2jS7t_gORfVOgPzdtu9XslMzOItg2_nMNTb0m81nfqhtrD0krfQP1izC5T3CxFJw_auMDRE9fLuYtDKgIBiu6nJxfbtonPg5uCP5YJeKBxM3hQRXTjuXnYx'

const Yelp = {

  search: function search(term, location, sortBy) {
    const cors = 'https://cors-anywhere.herokuapp.com/'
    const endpoint = cors + `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`

    return fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }).then(response => {
      return response.json()
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          return {
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zipCode,
            category: business.categories,
            rating: business.rating,
            reviewCount: business.reviw_count,
          }
        })
      }
    })
  },
}

export default Yelp
