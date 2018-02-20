library(lattice)
library(latticeExtra)
head(barley)



qqmath( ~ yield | variety, groups = year, data=barley, 
        auto.key = list(title ="Yield as per variety",cex=1.0),
        xlab = "Variety" , ylab = "Yield"
        )

#bwplot( variety ~ yield| site, groups = year, data=barley)
