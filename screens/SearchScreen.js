import React, { Component } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

import Screen from "../component/utils/Screen";
import { requestSearchMovie, requestSearchTv } from "../api/api";
import { orange, lightGray } from "../helper/Color";
import MovieList from "../component/MovieList";

import Icon from "react-native-vector-icons/Ionicons";
import BackIcon from "../component/Utils/BackIcon";