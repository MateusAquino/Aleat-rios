public class MersennePrime {
    
    /** Desafio do primo de Mersenne:
         • input: (x∈N)              = retorna bool(primoMersenne)
         • input: (x∈N),(y∈N | x>=y) = range(x,y).exclude(!primoMersenne).foreach(System.out#println)
    */
	public static void main(String[] args) {
		java.util.Scanner sc = new java.util.Scanner(System.in);
		String input = sc.nextLine();
		sc.close();
		if (input.contains(",")){
		    String[] nums = input.split(",");
		    verBonus(Integer.parseInt(nums[0]), Integer.parseInt(nums[1]));
		}
		else 
		    System.out.println(desafio(Integer.parseInt(input)));
	}
	
	static boolean desafio(int n) {
        if (n <= 1)  return false;
        if (n > 3) {
            if (n%2 == 0 || n%3 == 0) return false;
            for (int i=5; i*i<=n; i=i+6)
                if (n%i == 0 || n%(i+2) == 0)
                    return false;
        }
        return Math.log(n+1)/Math.log(2)%1==0;
	}
	
	static void verBonus(int de, int ate){
        System.out.println("Primos de Mersenne neste range:");
	    for (int i = de; i <= ate; i++) {
	        if (desafio(i))
	            System.out.println(i);
	    }
	}
}