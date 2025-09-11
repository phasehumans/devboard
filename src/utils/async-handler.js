// async fn try catch (repetative) --> asyncHandler
// higher order fn: takes fn as input and returns another fn

function asyncHandler(requestHandler){
    return function(req, res, next){
        Promise.resolve(requestHandler(req, res, next))
        .catch(function(err){
            next(err)
        })

    }
}

export {asyncHandler}