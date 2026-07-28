package com.example.weatherapp.ui

import androidx.compose.animation.*
import androidx.compose.animation.core.*
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.blur
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import kotlinx.coroutines.delay

// ==========================================
// 1. THEME & COLORS
// ==========================================
object WeatherColors {
    val DeepBlue = Color(0xFF0F2027)
    val SlateBlue = Color(0xFF203A43)
    val LightBlue = Color(0xFF2C5364)
    
    val Teal = Color(0xFF1D976C)
    val LightGreen = Color(0xFF93F9B9)
    
    val GlassWhite = Color(0x20FFFFFF) // 12% opacity white
    val GlassDark = Color(0x40000000)  // 25% opacity black
}

fun getBackgroundGradient(weatherType: String): Brush {
    return if (weatherType == "Sunny") {
        Brush.verticalGradient(listOf(WeatherColors.Teal, WeatherColors.LightGreen))
    } else {
        Brush.verticalGradient(listOf(WeatherColors.DeepBlue, WeatherColors.SlateBlue, WeatherColors.LightBlue))
    }
}

// ==========================================
// 2. SPLASH SCREEN
// ==========================================
@Composable
fun SplashScreen(onNavigateToSearch: () -> Unit) {
    var isVisible by remember { mutableStateOf(false) }

    LaunchedEffect(Unit) {
        isVisible = true
        delay(1500) // 1.5 seconds delay
        onNavigateToSearch()
    }

    val scale by animateFloatAsState(
        targetValue = if (isVisible) 1f else 0.5f,
        animationSpec = spring(dampingRatio = Spring.DampingRatioMediumBouncy)
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.White),
        contentAlignment = Alignment.Center
    ) {
        // Replace with your actual 3D icon drawable
        Image(
            painter = painterResource(id = android.R.drawable.ic_dialog_info), // Placeholder
            contentDescription = "App Logo",
            modifier = Modifier
                .size(150.dp)
                .scale(scale)
        )
    }
}

// ==========================================
// 3. SEARCH SCREEN
// ==========================================
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchScreen(onCitySelected: (String) -> Unit) {
    var searchQuery by remember { mutableStateOf("lon") }

    val searchResults = listOf(
        Pair("London", "City of London, Greater London, UK"),
        Pair("Londrina", "Parana, Brazil"),
        Pair("Loni", "Uttar Pradesh, India"),
        Pair("Long Xuyen", "Vietnam")
    )

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(getBackgroundGradient("Rainy")) // Default search bg
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(top = 60.dp, start = 20.dp, end = 20.dp)
        ) {
            // Glassmorphism Search Bar
            TextField(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(30.dp))
                    .background(WeatherColors.GlassWhite),
                placeholder = { Text("Search for a city...", color = Color.White.copy(alpha = 0.6f)) },
                leadingIcon = { Icon(Icons.Default.Search, contentDescription = null, tint = Color.White) },
                trailingIcon = { 
                    if (searchQuery.isNotEmpty()) {
                        IconButton(onClick = { searchQuery = "" }) {
                            Icon(Icons.Default.Close, contentDescription = "Clear", tint = Color.White)
                        }
                    }
                },
                colors = TextFieldDefaults.textFieldColors(
                    containerColor = Color.Transparent,
                    focusedIndicatorColor = Color.Transparent,
                    unfocusedIndicatorColor = Color.Transparent,
                    cursorColor = Color.White
                ),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(20.dp))

            // Search Results List
            LazyColumn(
                modifier = Modifier
                    .fillMaxSize()
                    .clip(RoundedCornerShape(20.dp))
                    .background(WeatherColors.GlassDark) // Glass container for list
            ) {
                items(searchResults) { city ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onCitySelected(city.first) }
                            .padding(20.dp),
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        // Icon Circle
                        Box(
                            modifier = Modifier
                                .size(40.dp)
                                .clip(CircleShape)
                                .background(Color.White.copy(alpha = 0.1f)),
                            contentAlignment = Alignment.Center
                        ) {
                            Icon(Icons.Default.LocationOn, contentDescription = null, tint = Color(0xFF7DD3FC))
                        }
                        
                        Spacer(modifier = Modifier.width(16.dp))
                        
                        Column {
                            Text(text = city.first, color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.SemiBold)
                            Text(text = city.second, color = Color.White.copy(alpha = 0.7f), fontSize = 14.sp)
                        }
                    }
                    Divider(color = Color.White.copy(alpha = 0.1f))
                }
            }
        }
    }
}

// ==========================================
// 4. WEATHER DETAILS SCREEN
// ==========================================
@Composable
fun WeatherDetailScreen(cityName: String, weatherType: String, temperature: String, onBack: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(getBackgroundGradient(weatherType))
    ) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(24.dp),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            
            // Mock Search Bar to click back
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(top = 20.dp)
                    .clip(RoundedCornerShape(30.dp))
                    .background(WeatherColors.GlassWhite)
                    .clickable { onBack() }
                    .padding(16.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Icon(Icons.Default.Search, contentDescription = null, tint = Color.White.copy(0.7f))
                Spacer(modifier = Modifier.width(12.dp))
                Text("Search for a city...", color = Color.White.copy(0.7f))
            }

            Spacer(modifier = Modifier.height(40.dp))

            // City Header
            Text(text = cityName, color = Color.White, fontSize = 36.sp, fontWeight = FontWeight.Bold)
            Text(text = "Sun, Jul 26 | 04:24 pm", color = Color.White.copy(0.8f), fontSize = 16.sp)

            Spacer(modifier = Modifier.height(30.dp))

            // 3D Weather Icon Placeholder
            Box(
                modifier = Modifier
                    .size(150.dp)
                    .clip(CircleShape)
                    .background(WeatherColors.GlassWhite),
                contentAlignment = Alignment.Center
            ) {
                // Replace with actual 3D icon drawable based on weatherType
                Text(text = "3D Icon", color = Color.White)
            }

            Spacer(modifier = Modifier.height(20.dp))

            // Temperature
            Text(text = "$temperature°C", color = Color.White, fontSize = 80.sp, fontWeight = FontWeight.Light)
            Text(text = if (weatherType == "Sunny") "Sunny" else "Patchy rain nearby", color = Color.White.copy(0.9f), fontSize = 20.sp)

            Spacer(modifier = Modifier.weight(1f))

            // Glassmorphism Details Card
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(24.dp))
                    .background(WeatherColors.GlassWhite)
                    .padding(vertical = 20.dp),
                horizontalArrangement = Arrangement.SpaceEvenly,
                verticalAlignment = Alignment.CenterVertically
            ) {
                WeatherDetailItem("Feels Like", if (weatherType == "Sunny") "28°C" else "14°C")
                Divider(modifier = Modifier.height(40.dp).width(1.dp), color = Color.White.copy(0.2f))
                WeatherDetailItem("Humidity", if (weatherType == "Sunny") "25%" else "60%")
                Divider(modifier = Modifier.height(40.dp).width(1.dp), color = Color.White.copy(0.2f))
                WeatherDetailItem("Wind", if (weatherType == "Sunny") "20.5 km/h" else "19.4 km/h")
            }
            
            Spacer(modifier = Modifier.height(20.dp))
        }
    }
}

@Composable
fun WeatherDetailItem(label: String, value: String) {
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = label, color = Color.White.copy(0.7f), fontSize = 14.sp)
        Spacer(modifier = Modifier.height(4.dp))
        Text(text = value, color = Color.White, fontSize = 18.sp, fontWeight = FontWeight.Bold)
    }
}
