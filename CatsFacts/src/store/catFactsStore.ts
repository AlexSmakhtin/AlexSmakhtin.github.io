import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {CatFact} from "../models/catFact.ts";
import {apiUrls} from "../api-urls/apiUrls.ts";

interface CatFactsState {
    catsFacts: CatFact[],
    isLoading: boolean,
    error: string
}

const initialState: CatFactsState = {
    catsFacts: Array.of<CatFact>(),
    isLoading: false,
    error: ""
}

const catSlice = createSlice({
        name: "catFactsSlice",
        initialState: initialState,
        reducers: {
            updateFact(state: CatFactsState, action: PayloadAction<CatFact>) {
                return {
                    ...state,
                    catsFacts: state.catsFacts.map((e) => e.id === action.payload.id ? action.payload : e)
                }
            },
            changeLikeState(state: CatFactsState, action: PayloadAction<CatFact>) {
                return {
                    ...state,
                    catsFacts: state.catsFacts.map((e) =>
                        e.id === action.payload.id ?
                            {...e, isLiked: !e.isLiked} : e
                    )
                }
            },
            changeLoading(state, _) {
                return {
                    ...state,
                    isLoading: !state.isLoading
                };
            },
            addFact(state: CatFactsState, action: PayloadAction<CatFact>) {
                return {
                    ...state,
                    catsFacts: [...state.catsFacts, action.payload]
                }
            },
            deleteFact(state: CatFactsState, action: PayloadAction<CatFact>) {
                return {
                    ...state,
                    catsFacts: state.catsFacts.filter(e => e.id !== action.payload.id)
                }
            }
        },
        extraReducers:
            (builder) => {
                builder.addCase(getAllFacts.pending, (state: CatFactsState) => {
                    state.isLoading = true;
                });
                builder.addCase(getAllFacts.fulfilled, (state: CatFactsState, action: PayloadAction<CatFact[]>) => {
                    state.catsFacts = action.payload.map(e => e);
                    state.error = "";
                    state.isLoading = false;
                });
                builder.addCase(getAllFacts.rejected, (state: CatFactsState, action) => {
                    state.catsFacts = [];
                    state.error = action.payload ? `Fetching error: ${action.payload}` : "Unknown error";
                    state.isLoading = false;
                });
            }
    })
;

export const getAllFacts = createAsyncThunk<
    CatFact[],
    void,
    { rejectValue: string }
>(
    "catFactsSlice/getAll",
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.facts);
            return response.data.map(item => {
                return {
                    id: item._id,
                    userId: item.user,
                    createdAt: new Date(item.createdAt).toDateString(),
                    isLiked: false,
                    text: item.text
                }
            })
        } catch (error: AxiosError) {
            return thunkApi.rejectWithValue(error.response?.data);
        }
    }
);

export const catReducer = catSlice.reducer;

export const {
    changeLikeState,
    deleteFact,
    addFact,
    updateFact
} = catSlice.actions;