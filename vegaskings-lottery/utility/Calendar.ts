export class Calendar {
    private fullDate: Date = new Date();
  
    getToday(): string {
      return `${this.getDayOfWeek()} ${this.getDate()} ${this.getMonth()} ${this.getFullYear()}`;
    }
  
    getFullYear(): number {
      return this.fullDate.getFullYear();
    }
  
    getMonth(): string {
      const num = this.fullDate.getMonth() + 1;
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[num];
    }
  
    getDayOfWeek(): string {
        const num = this.fullDate.getDay();
        const dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return dayWeek[num];
      }
    
    getDate(): number {
      return this.fullDate.getDate();
    }

    setDate(date: string){
        this.fullDate = new Date(date);
    }
  
  }
  
  