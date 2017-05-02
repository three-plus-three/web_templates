package web_templates

import rice "github.com/GeertJohan/go.rice"

var ViewsDirectory = rice.MustFindBox("app/views")
var PublicDirectory = rice.MustFindBox("public")
