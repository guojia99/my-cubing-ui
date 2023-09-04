/*
 *  * Copyright (c) 2023 guojia99 All rights reserved.
 *  * Created: 2023/7/21 下午9:03.
 *  * Author: guojia(https://github.com/guojia99)
 */

package main

import (
	"fmt"
	"net/http/httputil"
	"net/url"
	"os"
	"strings"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	api, _ := url.Parse("http://127.0.0.1:20000")
	proxy := httputil.NewSingleHostReverseProxy(api)

	router.Static("/static", "./build/static")
	router.NoRoute(func(context *gin.Context) {
		if strings.Contains(context.Request.URL.Path, "/v2/api") {
			proxy.ServeHTTP(context.Writer, context.Request)
			return
		}
		context.File("./build/index.html")
	})

	// Start and run the server
	_ = router.Run(fmt.Sprintf(":%s", os.Args[1]))
}
