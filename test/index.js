var tape = require('tape')
var fs = require('fs')
var concat = require('concat-stream')
var combine = require('../')

var run = function(input, output) {
  var test = this
  var expected = fs.readFileSync(output)
  var check = concat(function(result) {
    test.equal(
      result.toString(),
      expected.toString()
    )
    test.end()
  })

  combine(input).pipe(check)
}

tape('single level of @imports', function(test) {
  run.call(test,
    __dirname + '/css/all-single.css',
    __dirname + '/css/expected-single.css'
  )
})

tape('nested @imports', function(test) {
  run.call(test,
    __dirname + '/css/all-nested.css',
    __dirname + '/css/expected-nested.css'
  )
})
