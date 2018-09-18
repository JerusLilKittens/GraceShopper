 function averageReview(reviewArray) {
  let average = 0
  if (reviewArray.length === 0) {
    return 'be the first to add a rating!'
  }
  console.log('here')
  console.log(reviewArray)

  for (let i=0; i<reviewArray.length; i++) {
    average += Number(reviewArray[i].rating)
  }
  average = (Math.round(10 * (average / reviewArray.length))/10).toFixed(1) + ' out of 5.0'
  return average
}

export default averageReview
