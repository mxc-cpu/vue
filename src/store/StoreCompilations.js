import { defineStore } from 'pinia';
import { QueryAllUserCompilationsById } from "../api/CompilationsApi";

export const CompilationsListStore = defineStore
    ('CompilationsListStore', {
        state: () => ({
            CompilationsData: [],
            num:0,
        }), actions: {
            add(id) {this.num=10; console.log("numnum",this.num)},
             QueryCompilations(id) {
                 QueryAllUserCompilationsById(id).then((res) => {
                    if (res.data.success == true) {
                       this.CompilationsData =  res.data.data;
                       console.log("ddd",this.CompilationsData)

                    } else {
                      comsole.log("错误");
                    }
              
                  });

            }
        }
    }
    )