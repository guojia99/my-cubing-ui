/*
 *  * Copyright (c) 2023 guojia99 All rights reserved.
 *  * Created: 2023/7/21 下午9:03.
 *  * Author: guojia(https://github.com/guojia99)
 */

package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set the router as the default one shipped with Gin
	router := gin.Default()

	router.Static("/static", "./build/static")
	router.NoRoute(func(context *gin.Context) {
		context.File("./build/index.html")
	})

	// Start and run the server
	router.Run(fmt.Sprintf(":%s", os.Args[1]))
}
