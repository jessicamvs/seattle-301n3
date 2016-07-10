(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // ANSWER: this function is called when the user hits the article page where there's a specific article id, this function will load the corresponding article.  it is a function that takes the parameters of ctx and next.  the function part of it assigns a function to articleData.  that function assigns the current article to the articles property of the ctx object.  it then calls the next function, which is articlesController.index.   Afterwards, it calls Article.findWhere, passing it the arguments of id, ctx.params.id and articleData (the variable defined earlier).  prams is a parameter of the ctx object and it has an id, which matches up with the value paremeter expected by Article.findWhere.  basically it's saying 'go find the article that matches up with this ID.'
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // ANSWER: This is called when the user visits the /author/:authorName route
  // This method assigns a function to the variable authorData.
  // Within the authorData function we assign the articlesByAuthor parameter
  // to the articles property of the ctx object then run the next() callback
  // which represents the articlesController.index() function.
  // We then run the Article.findWhere method which takes three parameters
  // field ('author'), value ('ctx.params.authorName.replace('+', ' ')'),
  // and callback (authorData). So this will pull articles by the author
  // we specify
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //ANSWER: This method is called when the user hits the '/category/:categoryName' route. ctx is passed from articlesController.loadAll. articlesController.index will be passed in as next. ctx.articles will be assined the vaule of articlesInCategory which will be an array of article objects that share the same category that was selected. Article.findWhere is invoked and will return the array of article objects with the same category which will be passed into articlesController.index as ctx.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // ANSWER: this is called when the user hits the home or / route.  it takes 2 parameters, ctx and next.  what loadAll does is assign a function to articleData.  that function takes an parameter of allArticles.  the function assigns the Article.all value to the articles property of the ctx object.  it then calls next, which is articlesController.index.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };
// the IF conditional below verifies if Article.all.length is a truthy stmt.  if it is, it assigns Article.all to ctx.articles and calls next, which would be articlesController.index.  otherwise it has to fetchAll the articles.  BUT THERE'S A QUESTION AS TO WHY LINE 44 EXISTS IF WE'RE HAVING TO VERIFY IF ARTICLE.ALL.LENGTH IS TRUTHY.
// fetchAll pulls the info from the DB (when called it passes the argument of articleData).
    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
