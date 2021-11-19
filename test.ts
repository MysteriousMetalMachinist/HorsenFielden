// This test program sets up the BME688 sensor and data logging, constantly displays date, time and all environmental readings on the OLED screen, logs data on Button A, transfers data on Button B and erases all date on button A+B
input.onButtonPressed(Button.A, function () {
    kitronik_air_quality.show("Logging...", 1, kitronik_air_quality.ShowAlign.Centre)
    for (let index = 0; index < 10; index++) {
        kitronik_air_quality.measureData()
        kitronik_air_quality.logData()
        basic.pause(2000)
    }
    kitronik_air_quality.show("Logging Complete!", 2, kitronik_air_quality.ShowAlign.Centre)
    basic.pause(2000)
    kitronik_air_quality.clear()
})
input.onButtonPressed(Button.AB, function () {
    kitronik_air_quality.eraseData()
})
input.onButtonPressed(Button.B, function () {
    kitronik_air_quality.sendAllData()
})
kitronik_air_quality.setDate(23, 9, 21)
kitronik_air_quality.setTime(14, 9, 0)
let statusLEDs = kitronik_air_quality.createAirQualityZIPDisplay()
statusLEDs.showColor(kitronik_air_quality.colors(ZipLedColors.Red))
kitronik_air_quality.setupGasSensor()
kitronik_air_quality.calcBaselines()
kitronik_air_quality.setDataForUSB()
kitronik_air_quality.selectSeparator(kitronik_air_quality.Separator.semicolon)
kitronik_air_quality.includeDate()
kitronik_air_quality.includeTime()
kitronik_air_quality.includeTemperature(kitronik_air_quality.TemperatureUnitList.C)
kitronik_air_quality.includePressure(kitronik_air_quality.PressureUnitList.Pa)
kitronik_air_quality.includeHumidity()
kitronik_air_quality.includeIAQ()
kitronik_air_quality.includeCO2()
kitronik_air_quality.includeLight()
kitronik_air_quality.addProjectInfo("Name", "Subject")
basic.forever(function () {
    kitronik_air_quality.measureData()
    kitronik_air_quality.show(kitronik_air_quality.readDate(), 1, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(kitronik_air_quality.readTime(), 2, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(kitronik_air_quality.readTemperature(kitronik_air_quality.TemperatureUnitList.C), 3, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(kitronik_air_quality.readPressure(kitronik_air_quality.PressureUnitList.Pa), 4, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(kitronik_air_quality.readHumidity(), 5, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(kitronik_air_quality.getAirQualityScore(), 6, kitronik_air_quality.ShowAlign.Left)
    kitronik_air_quality.show(kitronik_air_quality.readeCO2(), 7, kitronik_air_quality.ShowAlign.Left)
})
