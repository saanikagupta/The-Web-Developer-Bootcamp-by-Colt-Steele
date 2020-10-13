<%- include("../partials/header") %>

<div class="container">
    <div class="row">
        <h1 style="text-align: center">Edit <%= campground.name %></h1>
        <div style="width: 30%; margin: 25px auto;">
            <form action="/campgrounds/<%= campground._id %>/edit?_method=PUT" method="POST">
                <div class="form-group">
                    <input class="form-control" type="text" name="name" value="<%= campground.name %>">
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" name="image" value="<%= campground.image %>">
                </div>
                <div class="form-group">
                    <input class="form-control" type="text" name="description" value="<%= campground.description %>">
                </div>
                <div class="form-group">
                    <button class="btn btn-lg btn-primary btn-block">Submit!</button>
                </div>
            </form>
            <a href="/campgrounds">Go Back</a>
        </div>
    </div>
</div>

<%- include("../partials/footer") %></div>